import { ClienteRepository } from '@/domain/application/repositories/cliente-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Cliente } from '@/domain/enterprise/entities/cliente'
import { PrismaClienteMapper } from '../mappers/prisma-cliente-mapper'

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  async register(cliente: Cliente): Promise<void> {
    const data = PrismaClienteMapper.toPrisma(cliente)

    await this.prisma.cliente.create({
      data,
    })
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

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return clientes.map((cliente) => {
      return PrismaClienteMapper.toDomain(cliente)
    })
  }

  async edit(cliente: Cliente): Promise<void> {
    const data = PrismaClienteMapper.toPrisma(cliente)

    await this.prisma.cliente.update({
      where: {
        codigo: data.codigo,
      },
      data,
    })
  }
}
