import { Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { listAllAppsDTO } from '../../dtos/list-all-apps-dto'
import { ListAllAppsUseCase } from '@/domain/application/use-cases/list-all-apps'
import { AppPresenter } from '../../presenters/app-presenter'

const appsResponse = z.array(
  z.object({
    codigo: z.string().uuid(),
    nome: z.string(),
    custoMensal: z.number(),
  }),
)

type AppsResponse = z.infer<typeof appsResponse>

@Controller('/servcad/aplicativos')
@ApiTags('Aplicativos')
export class ListAllAppsController {
  constructor(private listAllAppsUseCase: ListAllAppsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de todos os aplicativos cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [listAllAppsDTO],
  })
  async handle(): Promise<AppsResponse> {
    const result = await this.listAllAppsUseCase.execute()

    if (result.isLeft()) {
      throw new Error()
    }

    const aplicativos = result.value.aplicativos

    return aplicativos.map(AppPresenter.toHTTP)
  }
}
