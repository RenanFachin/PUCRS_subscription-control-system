import {
  Assinatura,
  AssinaturaProps,
} from '@/domain/enterprise/entities/assinaturas'

export function makeSubscription(
  codApp: string,
  codCli: string,
  override: Partial<AssinaturaProps> = {},
) {
  const assinatura = Assinatura.create({
    codApp,
    codCli,
    ...override,
  })

  return assinatura
}
