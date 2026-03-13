import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await (prisma as any).user.findUnique({
            where: { email: credentials.email },
            include: { salesRep: true },
          });

          if (!user) return null;

          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            company: user.company,
            salesRepId: user.salesRepId,
            salesRepName: user.salesRep?.name || null,
            territory: user.territory,
          };
        } catch {
          // Fallback demo auth if DB is not set up yet
          if (
            credentials.email === "builder@boatify.com" &&
            credentials.password === "boatify2024"
          ) {
            return {
              id: "demo-1",
              email: "builder@boatify.com",
              name: "Demo Boat Works",
              role: "oem",
              company: "Demo Boat Works",
              salesRepId: null,
              salesRepName: null,
              territory: null,
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.company = (user as any).company;
        token.salesRepId = (user as any).salesRepId;
        token.salesRepName = (user as any).salesRepName;
        token.territory = (user as any).territory;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).company = token.company;
        (session.user as any).salesRepId = token.salesRepId;
        (session.user as any).salesRepName = token.salesRepName;
        (session.user as any).territory = token.territory;
      }
      return session;
    },
  },
  pages: {
    signIn: "/oem/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "boatify-dev-secret-change-in-production",
});

export { handler as GET, handler as POST };
