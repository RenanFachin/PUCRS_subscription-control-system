import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { makeClient } from 'test/factories/make-client'
import { ListAllClientsUseCase } from './list-all-clients'

let inMemoryClienteRepository: InMemoryClienteRepository
let sut: ListAllClientsUseCase

describe('Get all clients', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    sut = new ListAllClientsUseCase(inMemoryClienteRepository)
  })

  it('should be able to get all clients', async () => {
    const primeiroCliente = makeClient()
    const segundoCliente = makeClient()

    inMemoryClienteRepository.register(primeiroCliente)
    inMemoryClienteRepository.register(segundoCliente)

    const clientes = await sut.execute()

    expect(clientes.value?.clientes).length(2)
  })
})
