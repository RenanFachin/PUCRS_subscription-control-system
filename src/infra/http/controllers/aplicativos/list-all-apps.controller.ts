import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
import { listAllAppsDTO } from '../../dtos/list-all-apps-dto'

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
  constructor(private prisma: PrismaService) {}

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
    const apps = await this.prisma.aplicativo.findMany()

    return apps
  }
}
