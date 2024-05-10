import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'
import { AssinaturaDetails } from '@/domain/application/use-cases/get-client-subscription'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAssinaturaRepository implements AssinaturaRepository {
  register(assinatura: Assinatura): Promise<void> {
    throw new Error('Method not implemented.')
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
}
