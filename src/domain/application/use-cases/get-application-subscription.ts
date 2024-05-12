import { AssinaturaRepository } from '../repositories/assinatura-repository'
import { AplicativoRepository } from '../repositories/aplicativo-repository'

export interface AssinaturaDetails {
  codigoAssinatura: string
  codigoCliente: string
  codigoAplicativo: string
  dataInicio: Date
  dataEncerramento: Date
  status: string
}

interface GetApplicationSubscriptionUseCaseRequest {
  codigoAplicativo: string
}

interface GetApplicationSubscriptionUseCaseResponse {
  assinaturas: AssinaturaDetails[]
}

export class GetApplicationSubscriptionUseCase {
  constructor(
    private aplicativoRepository: AplicativoRepository,
    private assinaturaRepository: AssinaturaRepository,
  ) {}

  async execute({
    codigoAplicativo,
  }: GetApplicationSubscriptionUseCaseRequest): Promise<GetApplicationSubscriptionUseCaseResponse> {
    const aplicativo =
      await this.aplicativoRepository.findById(codigoAplicativo)

    if (!aplicativo) {
      throw new Error('Aplicativo não encontrado.')
    }

    const assinaturas =
      await this.assinaturaRepository.listByApp(codigoAplicativo)

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
