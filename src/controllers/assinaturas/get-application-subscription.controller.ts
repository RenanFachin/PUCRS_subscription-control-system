import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApplicationSubscriptionDTO } from 'src/dtos/get-application-subscription-dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/servcad/assapp/:codapp')
@ApiTags('Assinaturas')
export class GetApplicationSubscriptionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'List of client subscription details',
    type: [ApplicationSubscriptionDTO],
  })
  @ApiResponse({ status: 400, description: 'Aplicativo não cadatrado.' })
  async handle(@Param('codapp') codapp: string) {
    const isApplicationRegistered = await this.prisma.aplicativo.findFirst({
      where: {
        codigo: codapp,
      },
    })

    if (!isApplicationRegistered) {
      throw new BadRequestException('Aplicativo não cadatrado.')
    }

    const applicationDetails = await this.prisma.aplicativo.findMany({
      where: {
        codigo: codapp,
      },
      include: {
        assinaturas: {
          select: {
            codigo: true,
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
            inicioVigencia: true,
            fimVigencia: true,
          },
        },
      },
    })

    const dataHoje = new Date()
    const subscriptions = applicationDetails.flatMap((cliente) =>
      cliente.assinaturas.map((assinatura) => ({
        codigoAssinatura: assinatura.codigo,
        codigoCliente: assinatura.cliente,
        codigoAplicativo: assinatura.aplicativo,
        dataInicio: assinatura.inicioVigencia,
        dataFim: assinatura.fimVigencia,
        status:
          assinatura.inicioVigencia <= dataHoje &&
          dataHoje <= assinatura.fimVigencia
            ? 'ATIVA'
            : 'CANCELADA',
      })),
    )

    return subscriptions
  }
}
