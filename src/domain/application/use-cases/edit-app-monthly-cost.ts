import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { AplicativoRepository } from '../repositories/aplicativo-repository'

// usuário vai poder editar o custo mensal

interface EditAppMonthlyCostUseCaseRequest {
  codigo: UniqueEntityCodigo
  custoMensal: number
}

interface EditAppMonthlyCostUseCaseResponse {
  aplicativo: Aplicativo
}

export class EditAppMonthlyCostUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    codigo,
    custoMensal,
  }: EditAppMonthlyCostUseCaseRequest): Promise<EditAppMonthlyCostUseCaseResponse> {
    // Buscar o cliente e verificar se o cliente existe
    const aplicativo = await this.aplicativoRepository.findById(codigo)

    if (!aplicativo) {
      throw new Error('Aplcativo não econtrado')
    }

    // Realizando a alteração dos campos
    aplicativo.custoMensal = custoMensal

    await this.aplicativoRepository.edit(aplicativo)

    return { aplicativo }
  }
}
