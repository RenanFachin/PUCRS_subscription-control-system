import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Assinatura as PrismaAssinatura } from '@prisma/client'

export class PrismaAssinaturaMapper {
  static toDomain(raw: PrismaAssinatura): Assinatura {
    return Assinatura.create(
      {
        codApp: raw.codApp,
        codCli: raw.codCli,
        inicioVigencia: raw.inicioVigencia,
        fimVigencia: raw.fimVigencia,
      },
      new UniqueEntityCodigo(raw.codigo),
    )
  }
}
