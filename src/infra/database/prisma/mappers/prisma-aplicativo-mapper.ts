import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'
import { Aplicativo as PrismaAplicativo } from '@prisma/client'

export class PrismaAplicativoMapper {
  static toDomain(raw: PrismaAplicativo): Aplicativo {
    return Aplicativo.create(
      {
        nome: raw.nome,
        custoMensal: raw.custoMensal,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }
}
