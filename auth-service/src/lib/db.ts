import { PrismaClient } from "@prisma/client";

// In Prisma 7, the URL is no longer read from the schema.
// We pass it to the constructor instead.
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

export default prisma;
