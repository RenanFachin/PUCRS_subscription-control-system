import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RegisterClientController } from './controllers/register-client.controller'
import { RegisterApllicationController } from './controllers/register-application.controller'

@Module({
  imports: [],
  controllers: [RegisterClientController, RegisterApllicationController],
  providers: [PrismaService],
})
export class AppModule { }
