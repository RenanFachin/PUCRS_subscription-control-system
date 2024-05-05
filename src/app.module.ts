import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RegisterClientController } from './controllers/register-client.controller'
import { RegisterApllicationController } from './controllers/register-application.controller'
import { RegisterSubscriptionController } from './controllers/register-subscription.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { ListAllClientsController } from './controllers/list-all-clients.controller'
import { ListAllAppsController } from './controllers/list-all-apps.controller'
import { ListAllCurrentSubscriptionsController } from './controllers/list-all-current-subscriptions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    RegisterClientController,
    RegisterApllicationController,
    RegisterSubscriptionController,
    ListAllClientsController,
    ListAllAppsController,
    ListAllCurrentSubscriptionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
