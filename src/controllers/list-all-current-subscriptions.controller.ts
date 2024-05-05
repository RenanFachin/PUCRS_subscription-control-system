import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListAllCurrentSubscriptionsDTO } from 'src/dtos/list-all-current-subscriptions-dto'

const listAllCurrentSubscriptionResponse = z.array(
  z.object({
    codigo: z.string().uuid(),
    codApp: z.string().uuid(),
    codCli: z.string().uuid(),
    inicioVigencia: z.date(),
    fimVigencia: z.date().nullable(),
  }),
)

type ListAllCurrentSubscriptionResponse = z.infer<
  typeof listAllCurrentSubscriptionResponse
>

@Controller('/servcad/assinaturas/:tipo')
@ApiTags('Assinaturas')
export class ListAllCurrentSubscriptionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary:
      'Retorna uma lista das assinaturas ativas, canceladas e de todas cadastradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [ListAllCurrentSubscriptionsDTO],
  })
  @ApiResponse({ status: 400, description: 'Tipo informado não existente' })
  async handle(
    @Param('tipo') tipoParam: 'TODAS' | 'ATIVAS' | 'CANCELADAS',
  ): Promise<ListAllCurrentSubscriptionResponse> {
    let assinaturas

    const tipo = (tipoParam as string).toUpperCase() as
      | 'TODAS'
      | 'ATIVAS'
      | 'CANCELADAS'

    if (tipo === 'TODAS') {
      assinaturas = await this.prisma.assinatura.findMany()
    } else if (tipo === 'ATIVAS') {
      assinaturas = await this.prisma.assinatura.findMany({
        where: {
          OR: [
            {
              fimVigencia: { gte: new Date() },
            },
          ],
        },
      })
    } else if (tipo === 'CANCELADAS') {
      assinaturas = await this.prisma.assinatura.findMany({
        where: {
          AND: [{ fimVigencia: { lt: new Date() } }],
        },
      })
    } else {
      throw new BadRequestException('Tipo informado não existente')
    }

    return assinaturas
  }
}
