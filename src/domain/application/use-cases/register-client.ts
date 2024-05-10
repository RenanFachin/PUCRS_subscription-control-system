import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'
import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'

interface RegisterClientUseCaseRequest {
  nome: string
  email: string
}

type RegisterClientUseCaseResponse = Either<
  null,
  {
    cliente: Cliente
  }
>

@Injectable()
export class RegisterClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    email,
    nome,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const newCliente = Cliente.create({ nome, email })

    const cliente = await this.clienteRepository.register(newCliente)

    return right({ cliente })
  }
}
