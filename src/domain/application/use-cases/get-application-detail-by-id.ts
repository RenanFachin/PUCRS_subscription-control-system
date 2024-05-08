import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { AplicativoRepository } from '../repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

interface GetApplicationDetailByIdCaseRequest {
  codigo: UniqueEntityCodigo
}

interface GetApplicationDetailByIdCaseResponse {
  aplicativo: Aplicativo
}

export class GetApplicationDetailByIdCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute({
    codigo,
  }: GetApplicationDetailByIdCaseRequest): Promise<GetApplicationDetailByIdCaseResponse> {
    const aplicativo = await this.aplicativoRepository.findById(codigo)

    if (!aplicativo) {
      throw new Error('Aplicativo não econtrado')
    }

    return { aplicativo }
  }
}
