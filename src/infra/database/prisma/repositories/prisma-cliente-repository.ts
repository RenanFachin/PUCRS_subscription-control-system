import { ClienteRepository } from '@/domain/application/repositories/cliente-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Cliente } from '@/domain/enterprise/entities/cliente'
import { PrismaClienteMapper } from '../mappers/prisma-cliente-mapper'

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  register(cliente: Cliente): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!cliente) {
      return null
    }

    return PrismaClienteMapper.toDomain(cliente)
  }

  findAll(): Promise<Cliente[] | null> {
    throw new Error('Method not implemented.')
  }

  edit(cliente: Cliente): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
