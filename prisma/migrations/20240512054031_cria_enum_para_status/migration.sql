/*
  Warnings:

  - The `status` column on the `assinaturas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativa', 'cancelada');

-- AlterTable
ALTER TABLE "assinaturas" DROP COLUMN "status",
ADD COLUMN     "status" "Status";
