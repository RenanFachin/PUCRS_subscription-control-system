import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { createsSubscriptionValidity } from 'src/utils/creates-subscription-validity'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { RegisterSubscriptionDTO } from '../../dtos/register-subscription-dto'
import { PaymentServiceEvent } from '../../payments/events/payment-service.event'

const registerSubscriptionBodySchema = z.object({
  codApp: z.string().uuid(),
  codCli: z.string().uuid(),
})

type RegisterSubscriptionBodySchema = z.infer<
  typeof registerSubscriptionBodySchema
>

@Controller('/servcad/assinaturas')
@ApiTags('Assinaturas')
export class RegisterSubscriptionController {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiBody({
    type: RegisterSubscriptionDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria uma assinatura válida.' })
  async handle(@Body() body: RegisterSubscriptionBodySchema) {
    const { codApp, codCli } = registerSubscriptionBodySchema.parse(body)

    /**
     * [x] - Verificar se o cliente existe
     * [x] - Verificar se o aplicativo existe
     * [x] - Verificar se já existe uma assinatura válida desde cliente e aplicativo
     * [x] - Realizar a criação do registro
     */

    const Client = await this.prisma.cliente.findFirst({
      where: {
        codigo: codCli,
      },
    })

    const Application = await this.prisma.aplicativo.findFirst({
      where: {
        codigo: codApp,
      },
    })

    if (!Client || !Application) {
      throw new NotFoundException('Usuário ou Aplicativo não encontrados.')
    }

    const isClientAlreadyRegisteredInThisApplication =
      await this.prisma.assinatura.findFirst({
        where: {
          codApp,
          codCli,
        },
      })

    if (isClientAlreadyRegisteredInThisApplication) {
      throw new BadRequestException('Usuário já registrado neste aplicativo')
    }

    const subscription = await this.prisma.assinatura.create({
      data: {
        codApp,
        codCli,
        fimVigencia: createsSubscriptionValidity(),
      },
    })

    // evento de pagamento do serviço de cadastramento
    const pagamentoEvent: PaymentServiceEvent = {
      dataPagamento: new Date(),
      codAssinatura: subscription.codigo,
      valorPago: 0, // Como é uma assinatura gratuita inicialmente, o valor pago é zero (7 dias)
    }
    this.eventEmitter.emit('pagamentoServicoCadastramento', pagamentoEvent)

    return {
      subscription,
    }
  }

  @OnEvent('pagamentoServicoCadastramento')
  handlePagamentoServicoCadastramento(event: PaymentServiceEvent) {
    console.log(
      'Evento de pagamento do serviço de cadastramento foi emitido:',
      event,
    )
  }
}
