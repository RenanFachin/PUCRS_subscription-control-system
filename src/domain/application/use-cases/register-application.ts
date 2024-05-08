import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { AplicativoRepository } from '../repositories/aplicativo-repository'

interface RegisterApplicationUseCaseRequest {
  nome: string
  custoMensal: number
}

interface RegisterApplicationUseCaseResponse {
  aplicativo: Aplicativo
}

export class RegisterApplicationUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    nome,
    custoMensal,
  }: RegisterApplicationUseCaseRequest): Promise<RegisterApplicationUseCaseResponse> {
    const aplicativo = Aplicativo.create({
      nome,
      custoMensal,
    })

    await this.aplicativoRepository.register(aplicativo)

    return { aplicativo }
  }
}
