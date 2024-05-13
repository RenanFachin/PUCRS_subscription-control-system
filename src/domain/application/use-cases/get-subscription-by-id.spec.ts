import { InMemoryAssinaturaRepository } from 'test/repositories/in-memory-assinatura-repository'
import { GetSubscriptionByIdUseCase } from './get-subscription-by-id'
import { SubscriptionNotFoundError } from '@/core/errors/errors/subscription-not-found'

let inMemoryAssinaturaRepository: InMemoryAssinaturaRepository
let sut: GetSubscriptionByIdUseCase

describe('Get subscription by id', () => {
  beforeEach(() => {
    inMemoryAssinaturaRepository = new InMemoryAssinaturaRepository()
    sut = new GetSubscriptionByIdUseCase(inMemoryAssinaturaRepository)
  })

  it('should return an error if the subscription is not found', async () => {
    const codigoAssinatura = 'non_existent_code'
    const response = await sut.execute({ codigoAssinatura })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(SubscriptionNotFoundError)
  })
})
