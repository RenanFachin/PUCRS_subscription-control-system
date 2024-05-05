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
import { ListAnEspecificClientController } from './controllers/clientes/list-an-especific-client.controller'

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
    ListAnEspecificClientController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
