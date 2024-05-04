import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RegisterClientController } from './controllers/register-client.controller'
import { RegisterApllicationController } from './controllers/register-application.controller'
import { RegisterSubscriptionController } from './controllers/register-subscription.controller'

@Module({
  imports: [],
  controllers: [RegisterClientController, RegisterApllicationController, RegisterSubscriptionController],
  providers: [PrismaService],
})
export class AppModule { }
