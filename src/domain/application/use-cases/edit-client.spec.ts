import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { makeClient } from 'test/factories/make-client'
import { EditClientUseCase } from './edit-client'
import { validateEmail } from '@/utils/validate-email-regex'

let inMemoryClienteRepository: InMemoryClienteRepository
let sut: EditClientUseCase

describe('Get a client by id', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    sut = new EditClientUseCase(inMemoryClienteRepository)
  })

  it('should be able to edit a client name and client email', async () => {
    const novoCliente = makeClient()

    inMemoryClienteRepository.register(novoCliente)

    await sut.execute({
      codigo: novoCliente.codigo,
      nome: 'Renan Fachin',
      email: 'renanfachin@email.com',
    })

    // console.log(cliente)
    expect(inMemoryClienteRepository.clientes[0]).toMatchObject({
      nome: 'Renan Fachin',
      email: 'renanfachin@email.com',
    })

    expect(validateEmail(inMemoryClienteRepository.clientes[0].email)).toBe(
      true,
    )
  })

  it('should not be possible to edit a user and assign an invalid email', async () => {
    const novoCliente = makeClient()

    inMemoryClienteRepository.register(novoCliente)

    expect(async () => {
      await sut.execute({
        codigo: novoCliente.codigo,
        nome: 'Renan Fachin',
        email: 'renanfachinemail.com',
      })
    }).rejects.toThrow()
  })

  it('should not be possible to edit the email and use the same one that was registered', async () => {
    const novoCliente = makeClient({
      email: 'renanfachin@email.com',
    })

    inMemoryClienteRepository.register(novoCliente)

    expect(async () => {
      await sut.execute({
        codigo: novoCliente.codigo,
        nome: 'Renan Fachin',
        email: 'renanfachin@email.com',
      })
    }).rejects.toThrow()
  })
})
