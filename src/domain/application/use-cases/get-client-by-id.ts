import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ClientNotFoundError } from '@/core/errors/errors/client-not-found-error'

interface GetClientByIdUseCaseRequest {
  codigo: string
}

type GetClientByIdUseCaseResponse = Either<
  ClientNotFoundError,
  {
    cliente: Cliente
  }
>

@Injectable()
export class GetClientByIdUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    codigo,
  }: GetClientByIdUseCaseRequest): Promise<GetClientByIdUseCaseResponse> {
    const cliente = await this.clienteRepository.findById(codigo)

    if (!cliente) {
      return left(new ClientNotFoundError())
    }

    return right({ cliente })
  }
}
