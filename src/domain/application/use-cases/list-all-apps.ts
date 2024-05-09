import { AplicativoRepository } from '../repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

interface ListAllAppsUseCaseResponse {
  aplicativos: Aplicativo[]
}

export class ListAllAppsUseCase {
  constructor(private aplicativoRepository: AplicativoRepository) {}

  async execute(): Promise<ListAllAppsUseCaseResponse> {
    const aplicativos = await this.aplicativoRepository.findAll()

    if (!aplicativos) {
      throw new Error()
    }

    return { aplicativos }
  }
}
