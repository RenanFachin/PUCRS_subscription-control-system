import { Entity } from '@/core/entities/entity'
import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Optional } from '@/core/types/optional'

export interface ClientProps {
  nome: string
  email: string
  createdAt: Date
  updatedAt?: Date
}

export class Cliente extends Entity<ClientProps> {
  get nome() {
    return this.props.nome
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set nome(nome: string) {
    this.props.nome = nome
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  static create(
    props: Optional<ClientProps, 'createdAt'>,
    codigo?: UniqueEntityCodigo,
  ) {
    const cliente = new Cliente({ ...props, createdAt: new Date() }, codigo)

    return cliente
  }
}
