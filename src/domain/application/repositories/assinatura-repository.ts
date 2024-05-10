import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaDetails } from '../use-cases/get-client-subscription'

export interface AssinaturaRepository {
  register(assinatura: Assinatura): Promise<void>
  findAll(): Promise<AssinaturaDetails[] | null>
  listByClient(id: UniqueEntityCodigo): Promise<AssinaturaDetails[]>
  listByApp(id: UniqueEntityCodigo): Promise<AssinaturaDetails[]>
}
