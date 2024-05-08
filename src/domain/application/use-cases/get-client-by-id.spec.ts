import { GetClientByIdUseCase } from './get-client-by-id'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { makeClient } from 'test/factories/make-client'

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

    const { cliente } = await sut.execute({
      codigo: novoCliente.codigo,
    })

    // console.log(cliente)
    expect(cliente.nome).toEqual('Renan')
  })
})
