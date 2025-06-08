import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log("Prisma fonctionne ✅", result);
} catch (err) {
  console.error("Erreur Prisma ❌", err);
} finally {
  await prisma.$disconnect();
}
