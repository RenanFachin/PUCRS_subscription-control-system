import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import {
  Assinatura,
  AssinaturaProps,
} from '@/domain/enterprise/entities/assinaturas'

export function makeSubscription(
  codApp: UniqueEntityCodigo,
  codCli: UniqueEntityCodigo,
  override: Partial<AssinaturaProps> = {},
) {
  const assinatura = Assinatura.create({
    codApp,
    codCli,
    ...override,
  })

  return assinatura
}
