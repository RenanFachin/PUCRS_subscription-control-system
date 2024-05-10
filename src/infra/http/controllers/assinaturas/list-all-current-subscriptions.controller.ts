import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListAllCurrentSubscriptionsDTO } from '../../dtos/list-all-current-subscriptions-dto'

const listAllCurrentSubscriptionResponse = z.array(
  z.object({
    codigo: z.string().uuid(),
    codApp: z.string().uuid(),
    codCli: z.string().uuid(),
    inicioVigencia: z.date(),
    fimVigencia: z.date(),
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
      if (tipo === 'TODAS') {
        const todasAssinaturas = await this.prisma.assinatura.findMany({
          select: {
            codigo: true,
            inicioVigencia: true,
            fimVigencia: true,
            cliente: {
              select: {
                codigo: true,
                nome: true,
                email: true,
              },
            },
            aplicativo: {
              select: {
                codigo: true,
                nome: true,
                custoMensal: true,
              },
            },
          },
        })

        assinaturas = todasAssinaturas.map(({ ...data }) => {
          if (data.fimVigencia.getTime() < new Date().getTime()) {
            return { ...data, status: 'cancelada' }
          } else {
            return { ...data, status: 'ativa' }
          }
        })
      }
    } else if (tipo === 'ATIVAS') {
      const dadosAssinaturas = await this.prisma.assinatura.findMany({
        select: {
          codigo: true,
          inicioVigencia: true,
          fimVigencia: true,
          cliente: {
            select: {
              codigo: true,
              nome: true,
              email: true,
            },
          },
          aplicativo: {
            select: {
              codigo: true,
              nome: true,
              custoMensal: true,
            },
          },
        },
        where: {
          OR: [
            {
              fimVigencia: { gte: new Date() },
            },
          ],
        },
      })

      assinaturas = dadosAssinaturas.map(({ ...data }) => {
        return {
          ...data,
          status: 'ativa',
        }
      })
    } else if (tipo === 'CANCELADAS') {
      const dadosAssinaturas = await this.prisma.assinatura.findMany({
        select: {
          codigo: true,
          inicioVigencia: true,
          fimVigencia: true,
          cliente: {
            select: {
              codigo: true,
              nome: true,
              email: true,
            },
          },
          aplicativo: {
            select: {
              codigo: true,
              nome: true,
              custoMensal: true,
            },
          },
        },
        where: {
          OR: [
            {
              fimVigencia: { gte: new Date() },
            },
          ],
        },
      })

      assinaturas = dadosAssinaturas.map(({ ...data }) => {
        return {
          ...data,
          status: 'cancelada',
        }
      })
    } else {
      throw new BadRequestException('Tipo informado não existente')
    }

    return assinaturas
  }
}
