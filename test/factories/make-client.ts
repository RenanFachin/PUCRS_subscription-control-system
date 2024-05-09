import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { ClientProps, Cliente } from '@/domain/enterprise/entities/cliente'
import { faker } from '@faker-js/faker'

export function makeClient(
  override: Partial<ClientProps> = {},
  codigo?: UniqueEntityCodigo,
) {
  const cliente = Cliente.create(
    {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      ...override,
    },
    codigo,
  )

  return cliente
}
