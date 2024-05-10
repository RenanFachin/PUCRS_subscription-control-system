import { Cliente } from '@/domain/enterprise/entities/cliente'

export interface ClienteRepository {
  register(cliente: Cliente): Promise<void>
  findById(id: string): Promise<Cliente | null>
  findAll(): Promise<Cliente[] | null>
  edit(cliente: Cliente): Promise<void>
}
