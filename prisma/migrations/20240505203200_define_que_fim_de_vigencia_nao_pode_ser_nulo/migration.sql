/*
  Warnings:

  - Made the column `fim_vigencia` on table `assinaturas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assinaturas" ALTER COLUMN "fim_vigencia" SET NOT NULL;
