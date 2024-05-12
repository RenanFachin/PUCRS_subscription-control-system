import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'
import { AssinaturaDetails } from '@/domain/application/use-cases/get-client-subscription'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Injectable } from '@nestjs/common'
import { PrismaAssinaturaMapper } from '../mappers/prisma-assinatura-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAssinaturaRepository implements AssinaturaRepository {
  constructor(private prisma: PrismaService) {}

  async register(assinatura: Assinatura): Promise<Assinatura> {
    const data = PrismaAssinaturaMapper.toPrisma(assinatura)

    // Caso esteja tudo correto com os dados de entrada, validar a criação
    const registeredSubscription = await this.prisma.assinatura.create({
      data,
    })

    return PrismaAssinaturaMapper.toDomain(registeredSubscription)
  }

  findAll(): Promise<AssinaturaDetails[] | null> {
    throw new Error('Method not implemented.')
  }

  listByClient(id: string): Promise<AssinaturaDetails[]> {
    throw new Error('Method not implemented.')
  }

  listByApp(id: string): Promise<AssinaturaDetails[]> {
    throw new Error('Method not implemented.')
  }

  async findByClientIdAndAppId(
    clientId: string,
    appId: string,
  ): Promise<Assinatura | null> {
    const assinatura = await this.prisma.assinatura.findFirst({
      where: {
        codCli: clientId,
        codApp: appId,
      },
    })

    if (!assinatura) {
      return null
    }

    return PrismaAssinaturaMapper.toDomain(assinatura)
  }
}
