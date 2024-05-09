import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { ClienteRepository } from '@/domain/application/repositories/cliente-repository'
import { Cliente } from '@/domain/enterprise/entities/cliente'

export class InMemoryClienteRepository implements ClienteRepository {
  public clientes: Cliente[] = []

  async register(cliente: Cliente) {
    this.clientes.push(cliente)
  }

  async findById(id: UniqueEntityCodigo) {
    const cliente = this.clientes.find((cliente) => cliente.codigo === id)

    if (!cliente) {
      return null
    }

    return cliente
  }

  async findAll() {
    return this.clientes
  }
}
