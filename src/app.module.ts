import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RegisterClientController } from './controllers/clientes/register-client.controller'
import { RegisterApllicationController } from './controllers/aplicativos/register-application.controller'
import { RegisterSubscriptionController } from './controllers/assinaturas/register-subscription.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { ListAllClientsController } from './controllers/clientes/list-all-clients.controller'
import { ListAllAppsController } from './controllers/aplicativos/list-all-apps.controller'
import { ListAllCurrentSubscriptionsController } from './controllers/assinaturas/list-all-current-subscriptions.controller'
import { getClientByIdController } from './controllers/clientes/get-client-by-id.controller'
import { GetApplicationDetailByIdController } from './controllers/aplicativos/get-application-detail.controller'
import { UpdateMonthlyCostApplicationControlller } from './controllers/aplicativos/update-monthly-cost-application.controller'
import { GetClientSubscriptionController } from './controllers/assinaturas/get-client-subscription.controller'
import { GetApplicationSubscriptionController } from './controllers/assinaturas/get-application-subscription.controller'

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
    getClientByIdController,
    GetApplicationDetailByIdController,
    UpdateMonthlyCostApplicationControlller,
    GetClientSubscriptionController,
    GetApplicationSubscriptionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
