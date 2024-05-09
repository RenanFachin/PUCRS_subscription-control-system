import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Optional } from '@/core/types/optional'
import { createsSubscriptionValidity } from '@/utils/creates-subscription-validity'

export interface AssinaturaProps {
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

  getSubscriptionDetails() {
    return {
      codigoAssinatura: this.codigo.toValue(),
      codigoCliente: this.props.codCli.toValue(),
      codigoAplicativo: this.props.codApp.toValue(),
      dataInicio: this.props.inicioVigencia,
      dataEncerramento: this.props.fimVigencia,
      status: this.getStatus('TODAS') === 'ativa' ? 'ATIVA' : 'CANCELADA',
    }
  }

  getStatus(tipo: 'TODAS' | 'ATIVAS' | 'CANCELADAS'): 'ativa' | 'cancelada' {
    if (tipo === 'TODAS') {
      // Retorna o status baseado na vigência da assinatura
      if (dayjs().isAfter(this.props.fimVigencia)) {
        return 'cancelada'
      } else {
        return 'ativa'
      }
    } else if (tipo === 'ATIVAS') {
      // Retorna 'ativa' se a assinatura estiver dentro do período de vigência
      if (dayjs().isBefore(this.props.fimVigencia)) {
        return 'ativa'
      } else {
        return 'cancelada'
      }
    } else if (tipo === 'CANCELADAS') {
      // Retorna 'cancelada' se a assinatura estiver fora do período de vigência
      if (dayjs().isAfter(this.props.fimVigencia)) {
        return 'cancelada'
      } else {
        return 'ativa'
      }
    } else {
      throw new Error('Tipo informado não existe')
    }
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
