import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaDetails } from '../use-cases/get-client-subscription'

export abstract class AssinaturaRepository {
  abstract register(assinatura: Assinatura): Promise<Assinatura>
  abstract findAll(): Promise<AssinaturaDetails[] | null>
  abstract listByClient(id: string): Promise<AssinaturaDetails[]>
  abstract listByApp(id: string): Promise<AssinaturaDetails[]>
  abstract findByClientIdAndAppId(
    clientId: string,
    appId: string,
  ): Promise<Assinatura | null>
}
