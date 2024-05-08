import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'

interface RegisterClientUseCaseRequest {
  nome: string
  email: string
}

interface RegisterClientUseCaseResponse {
  cliente: Cliente
}

export class RegisterClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    email,
    nome,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const cliente = Cliente.create({ nome, email })

    await this.clienteRepository.register(cliente)

    return { cliente }
  }
}
