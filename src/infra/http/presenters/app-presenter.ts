import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export class AppPresenter {
  static toHTTP(aplicativo: Aplicativo) {
    return {
      codigo: aplicativo.codigo.toString(),
      nome: aplicativo.nome,
      custo_mensal: aplicativo.custoMensal,
      created_at: aplicativo.createdAt,
    }
  }
}

export class CreateAppPresenter {
  static toHTTP(aplicativo: Aplicativo) {
    return {
      codigo: aplicativo.codigo.toString(),
      nome: aplicativo.nome,
      custo_mensal: aplicativo.custoMensal,
      created_at: aplicativo.createdAt,
    }
  }
}
