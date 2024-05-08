import {
  Aplicativo,
  AplicativoProps,
} from '@/domain/enterprise/entities/aplicativos'
import { faker } from '@faker-js/faker'

export function makeApplication(override: Partial<AplicativoProps> = {}) {
  const aplicativo = Aplicativo.create({
    nome: faker.company.name(),
    custoMensal: Number(faker.finance.amount({ min: 5, max: 10 })),
    ...override,
  })

  return aplicativo
}
