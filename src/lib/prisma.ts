/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("../app/generated/prisma") as typeof import("../app/generated/prisma");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3") as any;
const path = require("path");

const dbPath = path.join(process.cwd(), "dev.db");

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  return new PrismaClient({ adapter } as any);
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
