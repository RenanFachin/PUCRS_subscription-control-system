import { RegisterSubscriptionUseCase } from './register-subscription'
import { makeApplication } from 'test/factories/make-application'
import { makeClient } from 'test/factories/make-client'
import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'

let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let sut: RegisterSubscriptionUseCase

describe('Create a Subscription', () => {
  beforeEach(() => {
    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    sut = new RegisterSubscriptionUseCase(inMemoryAssinaturaRepository)
  })

  it('should be able to register a subscription', async () => {
    // Utilizando as factories para gerar entidade client e aplicativo, necessárias para criar uma assinatura
    const cliente = makeClient()
    const aplicativo = makeApplication()

    const { assinatura } = await sut.execute({
      codApp: aplicativo.codigo,
      codCli: cliente.codigo,
    })

    // console.log(assinatura)

    expect(assinatura.codigo).toBeTruthy()
    expect(inMemoryAssinaturaRepository.assinaturas[0].codigo).toEqual(
      assinatura.codigo,
    )
  })
})
