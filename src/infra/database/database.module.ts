import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAplicativoRepository } from './prisma/repositories/prisma-aplicativo-repository'
import { PrismaAssinaturaRepository } from './prisma/repositories/prisma-assinatura-repository'
import { PrismaClienteRepository } from './prisma/repositories/prisma-cliente-repository'
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository'
import { AplicativoRepository } from '@/domain/application/repositories/aplicativo-repository'
import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ClienteRepository,
      useClass: PrismaClienteRepository,
    },
    {
      provide: AplicativoRepository,
      useClass: PrismaAplicativoRepository,
    },
    {
      provide: AssinaturaRepository,
      useClass: PrismaAssinaturaRepository,
    },
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    PrismaClienteRepository,
  ],
  exports: [
    PrismaService,
    PrismaAplicativoRepository,
    PrismaAssinaturaRepository,
    ClienteRepository,
    AplicativoRepository,
    AssinaturaRepository,
  ],
})
export class DatabaseModule {}
