import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { makeApplication } from 'test/factories/make-application'
import { GetClientSubscriptionUseCase } from './get-client-subscription'
import { InMemoryClienteRepository } from 'test/repositories/in-memory-cliente-repository'
import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'
import { makeClient } from 'test/factories/make-client'
import { makeSubscription } from 'test/factories/make-subscription'
import { ClientNotFoundError } from '@/core/errors/errors/client-not-found-error'

let inMemoryClienteRepository: InMemoryClienteRepository
let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let sut: GetClientSubscriptionUseCase

describe('Get subscriptions by cliente id', () => {
  beforeEach(() => {
    inMemoryClienteRepository = new InMemoryClienteRepository()
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()

    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    sut = new GetClientSubscriptionUseCase(
      inMemoryClienteRepository,
      inMemoryAssinaturaRepository,
    )
  })

  it('should be able to get subscriptions by cliente id', async () => {
    // Cadastrando cliente
    const cliente = makeClient()
    await inMemoryClienteRepository.register(cliente)

    // Cadastrando aplicativo
    const primeiroAplicativo = makeApplication()
    const segundoAplicativo = makeApplication()
    const terceiroAplicativo = makeApplication()

    await inMemoryAplicativoRepository.register(primeiroAplicativo)
    await inMemoryAplicativoRepository.register(segundoAplicativo)
    await inMemoryAplicativoRepository.register(terceiroAplicativo)

    // Cadastrando uma assinatura do primeiro clinte com o
    const primeiraAssinatura = makeSubscription(
      primeiroAplicativo.codigo,
      cliente.codigo,
    )
    const segundaAssinatura = makeSubscription(
      segundoAplicativo.codigo,
      cliente.codigo,
    )
    const terceiraAssinatura = makeSubscription(
      terceiroAplicativo.codigo,
      cliente.codigo,
    )

    await inMemoryAssinaturaRepository.register(primeiraAssinatura)
    await inMemoryAssinaturaRepository.register(segundaAssinatura)
    await inMemoryAssinaturaRepository.register(terceiraAssinatura)

    const assinaturas = await sut.execute({
      codigoCliente: cliente.codigo.toString(),
    })

    if (assinaturas.isRight()) {
      expect(assinaturas.value.assinaturas.length).toBe(3)
      expect(inMemoryAssinaturaRepository.assinaturas[0].codCli).toBe(
        cliente.codigo,
      )
      expect(inMemoryAssinaturaRepository.assinaturas[1].codCli).toBe(
        cliente.codigo,
      )
      expect(inMemoryAssinaturaRepository.assinaturas[2].codCli).toBe(
        cliente.codigo,
      )
    }
  })

  it('should return an error if the client is not found', async () => {
    const codigoCliente = 'non_existent_code'
    const response = await sut.execute({ codigoCliente })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ClientNotFoundError)
  })
})
