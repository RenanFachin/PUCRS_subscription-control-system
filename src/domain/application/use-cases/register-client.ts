import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'
import { Injectable } from '@nestjs/common'

interface RegisterClientUseCaseRequest {
  nome: string
  email: string
}

// interface RegisterClientUseCaseResponse {
//   cliente: Cliente
// }

@Injectable()
export class RegisterClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({ email, nome }: RegisterClientUseCaseRequest) {
    const newCliente = Cliente.create({ nome, email })

    const cliente = await this.clienteRepository.register(newCliente)

    return { cliente }
  }
}
