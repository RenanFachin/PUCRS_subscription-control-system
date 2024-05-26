import { Module } from '@nestjs/common'
import { PaymentEventsService } from './events/payment-service.event'
import { PaymentMicroserviceController } from './events/payment-controller'

@Module({
  providers: [PaymentEventsService],
  controllers: [PaymentMicroserviceController],
})
export class PaymentEventsModule {}
