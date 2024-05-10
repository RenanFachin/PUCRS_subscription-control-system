import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { GetApplicationDetailByIdCase } from './get-application-detail-by-id'
import { makeApplication } from 'test/factories/make-application'

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

    const { aplicativo } = await sut.execute({
      codigo: newApp.codigo.toString(),
    })

    // console.log(cliente)

    expect(aplicativo.nome).toEqual('GloboPlay') // Espero que o nome do aplicativo seja Globoplay
    expect(aplicativo.custoMensal).toBeGreaterThan(5) // Espero que seja maior que 5
    expect(inMemoryAplicativoRepository.aplicativos).length(1) // Espero que o tamanho do array de aplicativos seja 1
  })
})
