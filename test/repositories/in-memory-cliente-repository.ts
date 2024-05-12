import { ClienteRepository } from '@/domain/application/repositories/cliente-repository'
import { Cliente } from '@/domain/enterprise/entities/cliente'

export class InMemoryClienteRepository implements ClienteRepository {
  public clientes: Cliente[] = []

  async register(cliente: Cliente) {
    this.clientes.push(cliente)

    return cliente
  }

  async findById(id: string) {
    const cliente = this.clientes.find(
      (cliente) => cliente.codigo.toString() === id,
    )

    if (!cliente) {
      return null
    }

    return cliente
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const cliente = this.clientes.find((cliente) => cliente.email === email)

    if (!cliente) {
      return null
    }

    return cliente
  }

  async findAll() {
    return this.clientes
  }

  async edit(editedClient: Cliente) {
    const clientIndex = this.clientes.findIndex(
      (cliente) => cliente.codigo === editedClient.codigo,
    )

    this.clientes[clientIndex] = editedClient
  }
}
