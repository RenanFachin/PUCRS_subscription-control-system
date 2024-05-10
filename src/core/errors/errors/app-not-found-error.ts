import { UseCaseError } from '@/core/errors/use-case-error'

export class AppNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Aplicativo não encontrado')
  }
}
