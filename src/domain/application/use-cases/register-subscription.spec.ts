import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { RegisterSubscriptionUseCase } from './register-subscription'
import { makeApplication } from 'test/factories/make-application'
import { makeClient } from 'test/factories/make-client'
import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'

let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let inMemoryClienteRepository: InMemoryClienteRepository

let sut: RegisterSubscriptionUseCase

describe('Create a Subscription', () => {
  beforeEach(() => {
    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()
    inMemoryClienteRepository = new InMemoryClienteRepository()

    sut = new RegisterSubscriptionUseCase(
      inMemoryAssinaturaRepository,
      inMemoryClienteRepository,
      inMemoryAplicativoRepository,
    )
  })

  it('should be able to register a subscription', async () => {
    // Utilizando as factories para gerar entidade client e aplicativo, necessárias para criar uma assinatura
    const cliente = makeClient()
    const aplicativo = makeApplication()

    const assinatura = await sut.execute({
      codApp: aplicativo.codigo.toString(),
      codCli: cliente.codigo.toString(),
    })

    // console.log(assinatura)

    if (assinatura.isRight()) {
      expect(assinatura.value?.assinatura.codigo).toBeTruthy()
      expect(inMemoryAssinaturaRepository.assinaturas[0].codigo).toEqual(
        assinatura.value?.assinatura.codigo,
      )
    }
  })

  it('should return ResourceNotFoundError when APP doesnt exists', async () => {
    const cliente = makeClient()

    const assinatura = await sut.execute({
      codApp: 'idQualquer',
      codCli: cliente.codigo.toString(),
    })

    if (assinatura.isLeft()) {
      expect(assinatura.value instanceof ResourceNotFoundError).toBe(true)
    }
  })

  it('should return ResourceNotFoundError when CLIENT doesnt exists', async () => {
    const aplicativo = makeApplication()

    const assinatura = await sut.execute({
      codApp: aplicativo.codigo.toString(),
      codCli: 'idQualquer',
    })

    if (assinatura.isLeft()) {
      expect(assinatura.value instanceof ResourceNotFoundError).toBe(true)
    }
  })

  it('should return an error when subscription already exists for the given client and application', async () => {
    const cliente = makeClient()
    const aplicativo = makeApplication()

    // Crie uma assinatura pré-existente para o cliente e aplicativo
    await sut.execute({
      codApp: aplicativo.codigo.toString(),
      codCli: cliente.codigo.toString(),
    })

    const newSubscription = await sut.execute({
      codApp: aplicativo.codigo.toString(),
      codCli: cliente.codigo.toString(),
    })

    if (newSubscription.isLeft()) {
      expect(newSubscription.value instanceof ResourceNotFoundError).toBe(true)
    }
  })
})
