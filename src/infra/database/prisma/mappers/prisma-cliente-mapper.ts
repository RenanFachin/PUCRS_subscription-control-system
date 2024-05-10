import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Cliente } from '@/domain/enterprise/entities/cliente'
import { Cliente as PrismaCliente } from '@prisma/client'

export class PrismaClienteMapper {
  static toDomain(raw: PrismaCliente): Cliente {
    return Cliente.create(
      {
        nome: raw.nome,
        email: raw.email,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }
}
