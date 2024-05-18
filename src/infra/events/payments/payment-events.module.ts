import { Module } from '@nestjs/common'
import { PaymentEventsService } from './events/payment-service.event'

@Module({
  providers: [PaymentEventsService],
})
export class PaymentEventsModule {}
