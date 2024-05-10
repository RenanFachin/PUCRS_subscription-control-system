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
import { DatabaseModule } from '../database/database.module'
import { RegisterClientUseCase } from '@/domain/application/use-cases/register-client'
import { ListAllClientsUseCase } from '@/domain/application/use-cases/list-all-clients'
import { GetClientByIdUseCase } from '@/domain/application/use-cases/get-client-by-id'
import { EditClientUseCase } from '@/domain/application/use-cases/edit-client'
import { RegisterApplicationUseCase } from '@/domain/application/use-cases/register-application'

@Module({
  imports: [DatabaseModule],
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
  providers: [
    RegisterClientUseCase,
    ListAllClientsUseCase,
    GetClientByIdUseCase,
    EditClientUseCase,
    RegisterApplicationUseCase,
  ],
})
export class HttpModule {}
