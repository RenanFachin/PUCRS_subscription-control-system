import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { HttpModule } from './http/http.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksModule } from '@/task/task.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    HttpModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {}
