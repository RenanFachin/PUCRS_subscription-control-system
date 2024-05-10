import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { makeApplication } from 'test/factories/make-application'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'
import { makeClient } from 'test/factories/make-client'
import { makeSubscription } from 'test/factories/make-subscription'
import { GetApplicationSubscriptionUseCase } from './get-application-subscription'

let inMemoryClienteRepository: InMemoryClienteRepository
let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let sut: GetApplicationSubscriptionUseCase

describe('Get subscriptions by cliente id', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()

    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    sut = new GetApplicationSubscriptionUseCase(
      inMemoryAplicativoRepository,
      inMemoryAssinaturaRepository,
    )
  })

  it('should be able to get subscriptions by cliente id', async () => {
    // Cadastrando aplicativo
    const aplicativo = makeApplication({ nome: 'Youtube Premium' })

    await inMemoryAplicativoRepository.register(aplicativo)

    // Cadastrando clientes
    const cliente1 = makeClient()
    const cliente2 = makeClient()
    const cliente3 = makeClient()
    await inMemoryClienteRepository.register(cliente1)
    await inMemoryClienteRepository.register(cliente2)
    await inMemoryClienteRepository.register(cliente3)

    // Cadastrando uma assinaturas dos 3 clientes no aplicativo
    const primeiraAssinatura = makeSubscription(
      aplicativo.codigo,
      cliente1.codigo,
    )
    const segundaAssinatura = makeSubscription(
      aplicativo.codigo,
      cliente2.codigo,
    )
    const terceiraAssinatura = makeSubscription(
      aplicativo.codigo,
      cliente3.codigo,
    )

    await inMemoryAssinaturaRepository.register(primeiraAssinatura)
    await inMemoryAssinaturaRepository.register(segundaAssinatura)
    await inMemoryAssinaturaRepository.register(terceiraAssinatura)

    const { assinaturas } = await sut.execute({
      codigoAplicativo: aplicativo.codigo.toString(),
    })

    console.log(assinaturas)

    expect(assinaturas.length).toBe(3)
    expect(inMemoryAssinaturaRepository.assinaturas[0].codApp).toBe(
      aplicativo.codigo,
    )
    expect(inMemoryAssinaturaRepository.assinaturas[1].codApp).toBe(
      aplicativo.codigo,
    )
    expect(inMemoryAssinaturaRepository.assinaturas[2].codApp).toBe(
      aplicativo.codigo,
    )
  })
})
