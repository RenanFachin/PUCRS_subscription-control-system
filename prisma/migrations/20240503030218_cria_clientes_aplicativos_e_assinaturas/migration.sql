-- CreateTable
CREATE TABLE "aplicativos" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "custo_mensal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "aplicativos_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "clientes" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "codigo" TEXT NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim_vigencia" TIMESTAMP(3),
    "codApp" TEXT NOT NULL,
    "codCli" TEXT NOT NULL,

    CONSTRAINT "assinaturas_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_codApp_fkey" FOREIGN KEY ("codApp") REFERENCES "aplicativos"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "clientes"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
