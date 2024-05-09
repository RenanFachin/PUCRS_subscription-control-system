import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'
import { ListAllSubscriptionUseCase } from './list-all-subscription'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { makeClient } from 'test/factories/make-client'
import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { makeApplication } from 'test/factories/make-application'
import { makeSubscription } from 'test/factories/make-subscription'

let inMemoryClienteRepository: InMemoryClienteRepository
let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let sut: ListAllSubscriptionUseCase

describe('Get all subscriptions', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()

    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    sut = new ListAllSubscriptionUseCase(inMemoryAssinaturaRepository)
  })

  it('should be able to get all subscriptions', async () => {
    // Cadastrando cliente
    const primeiroCliente = makeClient()
    const segundoCliente = makeClient()

    await inMemoryClienteRepository.register(primeiroCliente)
    await inMemoryClienteRepository.register(segundoCliente)

    // Cadastrando aplicativo
    const primeiroAplicativo = makeApplication()
    const segundoAplicativo = makeApplication()

    await inMemoryAplicativoRepository.register(primeiroAplicativo)
    await inMemoryAplicativoRepository.register(segundoAplicativo)

    // Cadastrando uma assinatura do primeiro clinte com o
    const primeiraAssinatura = makeSubscription(
      primeiroAplicativo.codigo,
      primeiroCliente.codigo,
    )

    const segundaAssinatura = makeSubscription(
      segundoAplicativo.codigo,
      segundoCliente.codigo,
      {
        inicioVigencia: new Date('2002-01-01'),
      },
    )

    // console.log(terceiraAssinatura)

    await inMemoryAssinaturaRepository.register(primeiraAssinatura)
    await inMemoryAssinaturaRepository.register(segundaAssinatura)

    const { assinaturas } = await sut.execute({ tipo: 'TODAS' })

    console.log(assinaturas)

    assinaturas.forEach((assinatura) => {
      const details = assinatura.getSubscriptionDetails()
      console.log(details)
    })

    // expect(assinaturas).length(2)
    // expect(assinaturas[1].codigo).toBeTruthy()
  })
})
