import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaRepository } from '../repositories/assinatura-repository'

interface ListAllSubscriptionUseCaseRequest {
  tipo: 'TODAS' | 'ATIVAS' | 'CANCELADAS'
}

interface ListAllSubscriptionUseCaseResponse {
  assinaturas: Assinatura[]
}

export class ListAllSubscriptionUseCase {
  constructor(private assinaturaRepository: AssinaturaRepository) {}

  async execute({
    tipo,
  }: ListAllSubscriptionUseCaseRequest): Promise<ListAllSubscriptionUseCaseResponse> {
    const assinaturas = await this.assinaturaRepository.findAll()

    if (!assinaturas) {
      throw new Error()
    }

    const filteredAssinaturas = assinaturas.filter((assinatura) => {
      const status = assinatura.getStatus(tipo)
      return (
        tipo === 'TODAS' ||
        (status === 'ativa' && tipo === 'ATIVAS') ||
        (status === 'cancelada' && tipo === 'CANCELADAS')
      )
    })

    return { assinaturas: filteredAssinaturas }
  }
}
