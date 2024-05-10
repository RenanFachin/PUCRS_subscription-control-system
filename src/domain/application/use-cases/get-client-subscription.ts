import { ClienteRepository } from '../repositories/cliente-repository'
import { AssinaturaRepository } from '../repositories/assinatura-repository'

export interface AssinaturaDetails {
  codigoAssinatura: string
  codigoCliente: string
  codigoAplicativo: string
  dataInicio: Date
  dataEncerramento: Date
  status: string
}

interface GetClientSubscriptionUseCaseRequest {
  codigoCliente: string
}

interface GetClientSubscriptionUseCaseResponse {
  assinaturas: AssinaturaDetails[]
}

export class GetClientSubscriptionUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
    private assinaturaRepository: AssinaturaRepository,
  ) {}

  async execute({
    codigoCliente,
  }: GetClientSubscriptionUseCaseRequest): Promise<GetClientSubscriptionUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(codigoCliente)

    if (!cliente) {
      throw new Error('Cliente não encontrado.')
    }

    const assinaturas =
      await this.assinaturaRepository.listByClient(codigoCliente)

    if (assinaturas.length === 0 || !assinaturas) {
      throw new Error('Este cliente não possui assinaturas.')
    }

    const assinaturasComStatus: AssinaturaDetails[] = assinaturas.map(
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
