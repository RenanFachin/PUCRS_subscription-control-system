import { RegisterClientUseCase } from './register-client'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'

let inMemoryClienteRepository: InMemoryClienteRepository
let sut: RegisterClientUseCase

describe('Create a client', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    sut = new RegisterClientUseCase(inMemoryClienteRepository)
  })

  it('should be able to register a client', async () => {
    const { cliente } = await sut.execute({
      nome: 'John Doe',
      email: 'johndoe@email.com',
    })

    // console.log(cliente)
    expect(cliente.codigo).toBeTruthy()
    expect(inMemoryClienteRepository.clientes[0].codigo).toEqual(cliente.codigo)
  })
})
