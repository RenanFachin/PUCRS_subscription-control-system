import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { GetApplicationDetailByIdCase } from './get-application-detail-by-id'
import { makeApplication } from 'test/factories/make-application'
import { AppNotFoundError } from '@/core/errors/errors/app-not-found-error'

let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let sut: GetApplicationDetailByIdCase

describe('Get an app details by id', () => {
  beforeEach(() => {
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()
    sut = new GetApplicationDetailByIdCase(inMemoryAplicativoRepository)
  })

  it('should be able to get an app details by id', async () => {
    const newApp = makeApplication({
      nome: 'GloboPlay',
    })

    // console.log(newApp)

    inMemoryAplicativoRepository.register(newApp)

    const aplicativo = await sut.execute({
      codigo: newApp.codigo.toString(),
    })

    if (aplicativo.isRight()) {
      const appDetails = aplicativo.value.aplicativo
      expect(appDetails.nome).toEqual('GloboPlay')
      expect(appDetails.custoMensal).toBeGreaterThan(5)
    }
  })

  it('should not be possible to list a non-existing App', async () => {
    const aplicativo = await sut.execute({
      codigo: 'fakeID',
    })

    if (aplicativo.isLeft()) {
      expect(aplicativo.value instanceof AppNotFoundError).toBe(true)
    }
  })
})
