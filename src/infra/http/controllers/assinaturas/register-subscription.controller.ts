import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { RegisterSubscriptionDTO } from '../../dtos/register-subscription-dto'
import { PaymentServiceEvent } from '../../payments/events/payment-service.event'
import { RegisterSubscriptionUseCase } from '@/domain/application/use-cases/register-subscription'
import { CreateAssinaturaPresenter } from '../../presenters/subscription-presenter'

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
    private registerSubscrition: RegisterSubscriptionUseCase,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiBody({
    type: RegisterSubscriptionDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria uma assinatura válida.' })
  async handle(@Body() body: RegisterSubscriptionBodySchema) {
    const { codApp, codCli } = registerSubscriptionBodySchema.parse(body)

    const result = await this.registerSubscrition.execute({
      codApp,
      codCli,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const { assinatura } = result.value

    // evento de pagamento do serviço de cadastramento
    const pagamentoEvent: PaymentServiceEvent = {
      dataPagamento: new Date(),
      codAssinatura: String(assinatura.codigo),
      valorPago: 0, // Como é uma assinatura gratuita inicialmente, o valor pago é zero (7 dias)
    }
    this.eventEmitter.emit('pagamentoServicoCadastramento', pagamentoEvent)

    return {
      assinatura: CreateAssinaturaPresenter.toHTTP(assinatura),
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
