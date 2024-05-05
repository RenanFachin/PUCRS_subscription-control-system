import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { listAllAppsDTO } from 'src/dtos/list-all-apps-dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'

@Controller('/servcad/aplicativos/:id')
@ApiTags('Aplicativos')
export class GetApplicationDetailController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna os detalhes de um aplicativo em específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: listAllAppsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Aplicativo não encontrado.',
  })
  async handle(@Param('id') id: string): Promise<listAllAppsDTO> {
    const application = await this.prisma.aplicativo.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!application) {
      throw new BadRequestException('Aplicativo não encontrado.')
    }

    return application
  }
}
