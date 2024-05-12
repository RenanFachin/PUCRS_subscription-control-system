/*
  Warnings:

  - You are about to drop the column `status` on the `assinaturas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assinaturas" DROP COLUMN "status";

-- DropEnum
DROP TYPE "Status";
