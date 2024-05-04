/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `aplicativos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aplicativos_nome_key" ON "aplicativos"("nome");
