import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  // private readonly logger = new Logger(TasksService.name)

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds')
  // }

  async onModuleInit() {
    await this.checkSubscriptions()
  }

  @Interval(60000)
  async checkSubscriptions() {
    const currentDate = new Date()

    // Atualizando os valores de status de uma determinada assinatura
    await this.prisma.assinatura.updateMany({
      where: {
        fimVigencia: {
          lt: currentDate,
        },
        status: 'ativa',
      },
      data: {
        status: 'cancelada',
      },
    })
  }
}
