import { RegisterApplicationUseCase } from './register-application'
import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'

let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let sut: RegisterApplicationUseCase

describe('Create an Application', () => {
  beforeEach(() => {
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()
    sut = new RegisterApplicationUseCase(inMemoryAplicativoRepository)
  })
  it('should be able to register an app', async () => {
    const aplicativo = await sut.execute({
      nome: 'Spotify',
      custoMensal: 20,
    })

    // console.log(aplicativo)

    expect(aplicativo.value?.aplicativo.codigo).toBeTruthy()
    expect(inMemoryAplicativoRepository.aplicativos[0].codigo).toEqual(
      aplicativo.value?.aplicativo.codigo,
    )
  })
})
