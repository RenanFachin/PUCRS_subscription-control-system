import { ClientProps, Cliente } from '@/domain/enterprise/entities/cliente'
import { faker } from '@faker-js/faker'

export function makeClient(override: Partial<ClientProps> = {}) {
  const cliente = Cliente.create({
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    ...override,
  })

  return cliente
}
