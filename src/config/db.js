import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

// 1. Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Create the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Create one Prisma Client instance
const prisma = new PrismaClient({
  adapter,
});

// 4. Export it so other files can use it
export default prisma;