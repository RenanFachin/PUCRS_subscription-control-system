import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'
import { Prisma, Assinatura as PrismaAssinatura } from '@prisma/client'

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

  static toPrisma(
    assinatura: Assinatura,
  ): Prisma.AssinaturaUncheckedCreateInput {
    return {
      codigo: assinatura.codigo.toString(),
      codApp: assinatura.codApp.toString(),
      codCli: assinatura.codCli.toString(),
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
    }
  }
}
