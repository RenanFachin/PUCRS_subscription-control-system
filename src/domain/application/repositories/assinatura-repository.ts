import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaDetails } from '../use-cases/get-client-subscription'

export interface AssinaturaRepository {
  register(assinatura: Assinatura): Promise<void>
  findAll(): Promise<AssinaturaDetails[] | null>
  listByClient(id: string): Promise<AssinaturaDetails[]>
  listByApp(id: string): Promise<AssinaturaDetails[]>
}
