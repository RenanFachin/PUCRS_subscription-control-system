import { Assinatura } from '@/domain/enterprise/entities/assinaturas'

export interface AssinaturaRepository {
  register(assinatura: Assinatura): Promise<void>
  findAll(): Promise<Assinatura[] | null>
}
