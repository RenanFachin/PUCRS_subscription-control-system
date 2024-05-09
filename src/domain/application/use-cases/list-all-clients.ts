import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'

interface ListAllClientsUseCaseResponse {
  clientes: Cliente[]
}

export class ListAllClientsUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(): Promise<ListAllClientsUseCaseResponse> {
    const clientes = await this.clienteRepository.findAll()

    if (!clientes) {
      throw new Error()
    }

    return { clientes }
  }
}
