import { Cliente } from '@/domain/enterprise/entities/cliente'
import { ClienteRepository } from '../repositories/cliente-repository'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'

// usuário vai poder editar o nome e o email

interface EditClientUseCaseRequest {
  codigo: UniqueEntityCodigo
  nome: string
  email: string
}

interface EditClientUseCaseResponse {
  cliente: Cliente
}

export class EditClientUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    codigo,
    nome,
    email,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    // Buscar o cliente e verificar se o cliente existe
    const cliente = await this.clienteRepository.findById(codigo)

    if (!cliente) {
      throw new Error('Cliente não econtrado')
    }

    // Realizando a alteração dos campos
    cliente.nome = nome
    cliente.email = email

    await this.clienteRepository.edit(cliente)

    return { cliente }
  }
}
