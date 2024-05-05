import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Patch,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger'
import { listAllAppsDTO } from 'src/dtos/list-all-apps-dto'

const updateMonthlyCostApplicationBodySchema = z.object({
  custoMensal: z.number(),
})

type UpdateMonthlyCostApplicationBodySchema = z.infer<
  typeof updateMonthlyCostApplicationBodySchema
>

class UpdateBodySwagger {
  @ApiProperty()
  custoMensal: number
}

@Controller('/servcad/aplicativos/:idAplicativo')
@ApiTags('Aplicativos')
export class UpdateMonthlyCostApplicationControlller {
  constructor(private prisma: PrismaService) {}

  @ApiBody({
    type: UpdateBodySwagger,
  })
  @Patch()
  @ApiOperation({
    summary: 'Atualizar o custo mensal do aplicativo',
  })
  @ApiResponse({
    status: 400,
    description: 'Aplicativo não encontrado.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Está tentando atualizar o dado com o mesmo valor já cadastrado.',
  })
  async handle(
    @Param('idAplicativo') idAplicativo: string,
    @Body() body: UpdateMonthlyCostApplicationBodySchema,
  ): Promise<listAllAppsDTO> {
    /**
     * [x] - Receber o pathParam e os dados do body
     * [x] - Verificar se o aplicativo está cadastrado
     * [x] - Verificar se o valor informado é o mesmo que está no db (evitar chamadas de update)
     * [x] - Fazer o update do aplicativo
     */

    const { custoMensal } = updateMonthlyCostApplicationBodySchema.parse(body)

    const isApplicationRegistered = await this.prisma.aplicativo.findFirst({
      where: {
        codigo: idAplicativo,
      },
    })

    if (!isApplicationRegistered) {
      throw new BadRequestException('Aplicativo não cadastrado.')
    }

    if (isApplicationRegistered.custoMensal === custoMensal) {
      throw new ConflictException(
        `O valor que você está tentando atualizar já é ${custoMensal}`,
      )
    }

    const updatedAppData = await this.prisma.aplicativo.update({
      where: {
        codigo: idAplicativo,
      },
      data: {
        custoMensal,
      },
    })

    return updatedAppData
  }
}
