import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { AssinaturaDetails } from '@/domain/application/use-cases/get-client-subscription'
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

export class PrismaAssinaturaDetailsMapper {
  static toDomain(raw: AssinaturaDetails): Assinatura {
    return Assinatura.create(
      {
        codApp: raw.codigoAplicativo,
        codCli: raw.codigoCliente,
        inicioVigencia: raw.dataInicio,
        fimVigencia: raw.dataEncerramento,
        status: raw.status || '',
      },
      new UniqueEntityCodigo(raw.codigoAssinatura),
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
