import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
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
    const cliente = await sut.execute({
      nome: 'John Doe',
      email: 'johndoe@email.com',
    })
    // console.log(cliente)

    if (cliente.isRight()) {
      expect(cliente.value?.cliente.codigo).toBeTruthy()
      expect(inMemoryClienteRepository.clientes[0].codigo).toEqual(
        cliente.value?.cliente.codigo,
      )
    }
  })

  it('should not be possible to register a user with an already registered email', async () => {
    await sut.execute({
      nome: 'John Doe',
      email: 'johndoe@email.com',
    })

    const cliente = await sut.execute({
      nome: 'joão',
      email: 'johndoe@email.com',
    })

    if (cliente.isLeft()) {
      expect(cliente.value instanceof UserAlreadyExistsError).toBe(true)
    }
  })
})
