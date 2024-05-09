import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { EditAppMonthlyCostUseCase } from './edit-app-monthly-cost'
import { makeApplication } from 'test/factories/make-application'

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
      codigo: novoApp.codigo,
      custoMensal: 39.98,
    })

    // console.log(cliente)
    expect(inMemoryAplicativoRepository.aplicativos[0]).toMatchObject({
      custoMensal: 39.98,
    })
  })
})
