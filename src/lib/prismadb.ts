import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const primsadb = globalThis || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = primsadb;
}

export default primsadb;
