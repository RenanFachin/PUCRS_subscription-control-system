import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { EditAppMonthlyCostUseCase } from './edit-app-monthly-cost'
import { makeApplication } from 'test/factories/make-application'
import { AppNotFoundError } from '@/core/errors/errors/app-not-found-error'

let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let sut: EditAppMonthlyCostUseCase

describe('Get a client by id', () => {
  beforeEach(() => {
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()
    sut = new EditAppMonthlyCostUseCase(inMemoryAplicativoRepository)
  })

  it('should be able to edit the monthly cost of an application', async () => {
    const novoApp = makeApplication()

    inMemoryAplicativoRepository.register(novoApp)

    await sut.execute({
      codigo: novoApp.codigo.toString(),
      custoMensal: 39.98,
    })

    // console.log(cliente)
    expect(inMemoryAplicativoRepository.aplicativos[0]).toMatchObject({
      custoMensal: 39.98,
    })
  })

  it('should not be possible to edit a non-existing applicatication', async () => {
    const app = await sut.execute({
      codigo: 'fakeId',
      custoMensal: 1000,
    })

    if (app.isLeft()) {
      expect(app.value instanceof AppNotFoundError).toBe(true)
    }
  })
})
