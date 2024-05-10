import { Module } from '@nestjs/common'
import { GetApplicationDetailByIdController } from './controllers/aplicativos/get-application-detail.controller'
import { ListAllAppsController } from './controllers/aplicativos/list-all-apps.controller'
import { RegisterApllicationController } from './controllers/aplicativos/register-application.controller'
import { UpdateMonthlyCostApplicationControlller } from './controllers/aplicativos/update-monthly-cost-application.controller'
import { GetApplicationSubscriptionController } from './controllers/assinaturas/get-application-subscription.controller'
import { GetClientSubscriptionController } from './controllers/assinaturas/get-client-subscription.controller'
import { ListAllCurrentSubscriptionsController } from './controllers/assinaturas/list-all-current-subscriptions.controller'
import { RegisterSubscriptionController } from './controllers/assinaturas/register-subscription.controller'
import { EditClientController } from './controllers/clientes/edit-client.controller'
import { GetClientByIdController } from './controllers/clientes/get-client-by-id.controller'
import { ListAllClientsController } from './controllers/clientes/list-all-clients.controller'
import { RegisterClientController } from './controllers/clientes/register-client.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    RegisterClientController,
    RegisterApllicationController,
    RegisterSubscriptionController,
    ListAllClientsController,
    ListAllAppsController,
    ListAllCurrentSubscriptionsController,
    GetClientByIdController,
    GetApplicationDetailByIdController,
    UpdateMonthlyCostApplicationControlller,
    GetClientSubscriptionController,
    GetApplicationSubscriptionController,
    EditClientController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
