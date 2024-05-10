import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'

interface GetClientByIdUseCaseRequest {
  codigo: string
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
