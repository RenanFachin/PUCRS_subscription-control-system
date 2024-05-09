import { InMemoryAplicativoRepository } from 'test/repositories/in-memory-aplicativo-repository'
import { ListAllAppsUseCase } from './list-all-apps'
import { makeApplication } from 'test/factories/make-application'

let inMemoryAplicativoRepository: InMemoryAplicativoRepository
let sut: ListAllAppsUseCase

describe('Get all apps', () => {
  beforeEach(() => {
    inMemoryAplicativoRepository = new InMemoryAplicativoRepository()
    sut = new ListAllAppsUseCase(inMemoryAplicativoRepository)

    function registarAplicativos(repository, ...appNames: string[]) {
      appNames.forEach((appName) => {
        const app = makeApplication({ nome: appName })
        repository.register(app)
      })
    }

    registarAplicativos(
      inMemoryAplicativoRepository,
      'Globoplay',
      'Spotify',
      'Youtube Premium',
    )
  })

  it('should be able to get all apps', async () => {
    const { aplicativos } = await sut.execute()

    // console.log(aplicativos)

    expect(aplicativos[2].codigo).toBeTruthy() // Espero que não seja null ou undefined
    expect(aplicativos).length(3) // Espero que o array tenha 3 posições ['','','']
    expect(inMemoryAplicativoRepository.aplicativos[1].nome).toEqual('Spotify') // Espero que a segunda posição do array seja o aplicativo com nome spotify
  })
})
