import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { AssinaturaRepository } from '../repositories/assinatura-repository'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'

interface RegisterSubscriptionUseCaseRequest {
  inicioVigencia: Date
  fimVigencia: Date
  codApp: UniqueEntityCodigo
  codCli: UniqueEntityCodigo
}

interface RegisterSubscriptionUseCaseResponse {
  assinatura: Assinatura
}

export class RegisterSubscriptionUseCase {
  constructor(private assinaturaRepository: AssinaturaRepository) {}

  async execute({
    codApp,
    codCli,
  }: RegisterSubscriptionUseCaseRequest): Promise<RegisterSubscriptionUseCaseResponse> {
    const assinatura = Assinatura.create({
      codApp,
      codCli,
    })

    await this.assinaturaRepository.register(assinatura)

    return { assinatura }
  }
}
