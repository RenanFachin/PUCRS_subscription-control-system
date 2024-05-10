import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAplicativoRepository } from './prisma/repositories/prisma-aplicativo-repository'
import { PrismaAssinaturaRepository } from './prisma/repositories/prisma-assinatura-repository'
import { PrismaClienteRepository } from './prisma/repositories/prisma-cliente-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    PrismaClienteRepository,
  ],
  exports: [
    PrismaService,
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    PrismaClienteRepository,
  ],
})
export class DatabaseModule {}
