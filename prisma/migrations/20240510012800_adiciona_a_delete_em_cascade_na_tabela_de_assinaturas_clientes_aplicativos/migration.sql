-- DropForeignKey
ALTER TABLE "assinaturas" DROP CONSTRAINT "assinaturas_codApp_fkey";

-- DropForeignKey
ALTER TABLE "assinaturas" DROP CONSTRAINT "assinaturas_codCli_fkey";

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_codApp_fkey" FOREIGN KEY ("codApp") REFERENCES "aplicativos"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "clientes"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;
