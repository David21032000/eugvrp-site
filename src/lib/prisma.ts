import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// Ensure DATABASE_URL is set so Prisma can initialize. If not provided, fall back
// to a local sqlite file in the project root (this matches the dev.db used elsewhere).
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = 'file:./dev.db'
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
