import { Cliente } from '@/domain/enterprise/entities/cliente'

export class ClientPresenter {
  static toHTTP(cliente: Cliente) {
    return {
      codigo: cliente.codigo.toString(),
      nome: cliente.nome,
      email: cliente.email,
      created_at: cliente.createdAt,
    }
  }
}

export class CreateClientPresenter {
  static toHTTP(cliente: Cliente) {
    return {
      codigo: cliente.codigo.toString(),
      nome: cliente.nome,
      email: cliente.email,
      created_at: cliente.createdAt,
    }
  }
}
