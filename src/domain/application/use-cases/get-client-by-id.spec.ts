import { GetClientByIdUseCase } from './get-client-by-id'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { makeClient } from 'test/factories/make-client'
import { ClientNotFoundError } from '@/core/errors/errors/client-not-found-error'

let inMemoryClienteRepository: InMemoryClienteRepository
let sut: GetClientByIdUseCase

describe('Get a client by id', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    sut = new GetClientByIdUseCase(inMemoryClienteRepository)
  })

  it('should be able to get a client by id', async () => {
    const novoCliente = makeClient({
      nome: 'Renan',
    })

    inMemoryClienteRepository.register(novoCliente)

    const cliente = await sut.execute({
      codigo: novoCliente.codigo.toString(),
    })

    if (cliente.isRight()) {
      const clientDetails = cliente.value.cliente
      expect(clientDetails.nome).toEqual('Renan')
    }
  })

  it('should not be possible to list a non-existing client', async () => {
    const cliente = await sut.execute({
      codigo: 'fakeID',
    })

    if (cliente.isLeft()) {
      expect(cliente.value instanceof ClientNotFoundError).toBe(true)
    }
  })
})
