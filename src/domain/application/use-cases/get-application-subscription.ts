import { AssinaturaRepository } from '../repositories/assinatura-repository'
import { AplicativoRepository } from '../repositories/aplicativo-repository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { AppNotFoundError } from '@/core/errors/errors/app-not-found-error'

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

type GetApplicationSubscriptionUseCaseResponse = Either<
  AppNotFoundError,
  {
    assinaturas: AssinaturaDetails[]
  }
>

@Injectable()
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
      return left(new AppNotFoundError())
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

    return right({ assinaturas: assinaturasComStatus })
  }
}
