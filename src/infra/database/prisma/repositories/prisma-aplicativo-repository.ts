import { AplicativoRepository } from '@/domain/application/repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaAplicativoMapper } from '../mappers/prisma-aplicativo-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAplicativoRepository implements AplicativoRepository {
  constructor(private prisma: PrismaService) {}

  async register(aplicativo: Aplicativo): Promise<Aplicativo> {
    const data = PrismaAplicativoMapper.toPrisma(aplicativo)

    const appWithSameName = await this.prisma.aplicativo.findUnique({
      where: {
        nome: aplicativo.nome,
      },
    })

    if (appWithSameName) {
      throw new ConflictException('Aplicativo já cadastrado em nosso sistema.')
    }

    const newApp = await this.prisma.aplicativo.create({
      data,
    })

    return PrismaAplicativoMapper.toDomain(newApp)
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
