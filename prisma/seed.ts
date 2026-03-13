/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../src/app/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // Create Sales Reps
  const corey = await (prisma as any).salesRep.upsert({
    where: { email: "corey@boatify.com" },
    update: {},
    create: {
      name: "Corey",
      email: "corey@boatify.com",
      phone: "(555) 234-5678",
      territory: "TX",
    },
  });
  console.log("Created sales rep:", corey.name);

  const sarah = await (prisma as any).salesRep.upsert({
    where: { email: "sarah@boatify.com" },
    update: {},
    create: {
      name: "Sarah Mitchell",
      email: "sarah@boatify.com",
      phone: "(555) 345-6789",
      territory: "Southeast",
    },
  });
  console.log("Created sales rep:", sarah.name);

  // Create demo OEM users
  const hashedPassword1 = await bcrypt.hash("boatify2024", 12);
  const hashedPassword2 = await bcrypt.hash("oem2024", 12);

  const demoUser1 = await (prisma as any).user.upsert({
    where: { email: "builder@boatify.com" },
    update: {},
    create: {
      email: "builder@boatify.com",
      password: hashedPassword1,
      name: "Demo Boat Works",
      company: "Demo Boat Works",
      role: "oem",
      territory: "TX",
      salesRepId: corey.id,
      notifyEmail: true,
      notifyPhone: false,
    },
  });
  console.log("Created OEM user:", demoUser1.name);

  const demoUser2 = await (prisma as any).user.upsert({
    where: { email: "coastal@boatify.com" },
    update: {},
    create: {
      email: "coastal@boatify.com",
      password: hashedPassword2,
      name: "Coastal Marine Builders",
      company: "Coastal Marine Builders",
      role: "oem",
      territory: "Southeast",
      salesRepId: sarah.id,
      notifyEmail: true,
      notifyPhone: true,
    },
  });
  console.log("Created OEM user:", demoUser2.name);

  console.log("\nSeed complete!");
  console.log("\nDemo OEM Accounts:");
  console.log("  1. builder@boatify.com / boatify2024 (Demo Boat Works, Rep: Corey)");
  console.log("  2. coastal@boatify.com / oem2024 (Coastal Marine Builders, Rep: Sarah)");
}

main()
  .then(async () => {
    await (prisma as any).$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await (prisma as any).$disconnect();
    process.exit(1);
  });
