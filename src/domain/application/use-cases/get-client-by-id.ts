import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'

interface GetClientByIdUseCaseRequest {
  codigo: UniqueEntityCodigo
}

interface GetClientByIdUseCaseResponse {
  cliente: Cliente
}

export class GetClientByIdUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    codigo,
  }: GetClientByIdUseCaseRequest): Promise<GetClientByIdUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(codigo)

    if (!cliente) {
      throw new Error('Cliente não econtrado')
    }

    return { cliente }
  }
}
