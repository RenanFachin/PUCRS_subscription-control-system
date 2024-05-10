import { AplicativoRepository } from '@/domain/application/repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAplicativoRepository implements AplicativoRepository {
  register(aplicativo: Aplicativo): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Aplicativo | null> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<Aplicativo[] | null> {
    throw new Error('Method not implemented.')
  }

  edit(aplicativo: Aplicativo): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
