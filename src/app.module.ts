import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RegisterClientController } from './controllers/register-client.controller'

@Module({
  imports: [],
  controllers: [RegisterClientController],
  providers: [PrismaService],
})
export class AppModule {}
