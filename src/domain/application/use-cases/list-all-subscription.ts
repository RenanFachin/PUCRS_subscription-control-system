import { AssinaturaRepository } from '../repositories/assinatura-repository'
import { AssinaturaDetails } from './get-client-subscription'

interface ListAllSubscriptionUseCaseRequest {
  tipo: 'TODAS' | 'ATIVAS' | 'CANCELADAS'
}

interface ListAllSubscriptionUseCaseResponse {
  assinaturas: AssinaturaDetails[]
}

export class ListAllSubscriptionUseCase {
  constructor(private assinaturaRepository: AssinaturaRepository) {}

  async execute({
    tipo,
  }: ListAllSubscriptionUseCaseRequest): Promise<ListAllSubscriptionUseCaseResponse> {
    const assinaturas = await this.assinaturaRepository.findAll()

    if (!assinaturas || assinaturas.length === 0) {
      throw new Error('Não foram encontradas assinaturas.')
    }

    let filteredAssinaturas = assinaturas

    if (tipo !== 'TODAS') {
      filteredAssinaturas = assinaturas.filter((assinatura) => {
        const status = assinatura.status === 'ativa' ? 'ATIVAS' : 'CANCELADAS'
        return status === tipo
      })
    }

    const assinaturasComStatus: AssinaturaDetails[] = filteredAssinaturas.map(
      (assinatura) => ({
        codigoAssinatura: assinatura.codigoAssinatura,
        codigoCliente: assinatura.codigoCliente,
        codigoAplicativo: assinatura.codigoAplicativo,
        dataInicio: assinatura.dataInicio,
        dataEncerramento: assinatura.dataEncerramento,
        status: assinatura.status,
      }),
    )

    return { assinaturas: assinaturasComStatus }
  }
}
