import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Optional } from '@/core/types/optional'
import { createsSubscriptionValidity } from '@/utils/creates-subscription-validity'

interface AssinaturaProps {
  inicioVigencia: Date
  fimVigencia: Date
  codApp: UniqueEntityCodigo
  codCli: UniqueEntityCodigo
}

export class Assinatura extends Entity<AssinaturaProps> {
  get inicioVigencia() {
    return this.props.inicioVigencia
  }

  get fimVigencia() {
    return this.props.fimVigencia
  }

  get codApp() {
    return this.props.codApp
  }

  get codCli() {
    return this.props.codCli
  }

  get isSubscriptionExpired(): boolean {
    return dayjs().isAfter(this.fimVigencia, 'day')
  }

  // método static não precisa ser instanciado
  static create(
    props: Optional<AssinaturaProps, 'inicioVigencia' | 'fimVigencia'>,
    codigo?: UniqueEntityCodigo,
  ) {
    const assinatura = new Assinatura(
      {
        ...props,
        inicioVigencia: new Date(),
        fimVigencia: createsSubscriptionValidity(),
      },
      codigo,
    )

    return assinatura
  }
}
