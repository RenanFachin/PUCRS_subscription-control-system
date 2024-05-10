import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { SubscriptionDto } from '../../dtos/get-client-subscription-dto'

@Controller('/servcad/asscli/:codcli')
@ApiTags('Assinaturas')
export class GetClientSubscriptionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'List of client subscription details',
    type: [SubscriptionDto],
  })
  @ApiResponse({ status: 400, description: 'Cliente não cadatrado.' })
  async handle(@Param('codcli') codcli: string) {
    const isClientRegistered = await this.prisma.cliente.findFirst({
      where: {
        codigo: codcli,
      },
    })

    if (!isClientRegistered) {
      throw new BadRequestException('Cliente não cadatrado.')
    }

    const clientDetails = await this.prisma.cliente.findMany({
      where: {
        codigo: codcli,
      },
      include: {
        assinaturas: {
          select: {
            codigo: true,
            aplicativo: {
              select: {
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
    const subscriptions = clientDetails.flatMap((cliente) =>
      cliente.assinaturas.map((assinatura) => ({
        codigoAssinatura: assinatura.codigo,
        codigoCliente: cliente.codigo,
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
