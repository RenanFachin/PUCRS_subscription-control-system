import { UseCaseError } from '@/core/errors/use-case-error'

export class AppAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Aplicativo já cadastrado.')
  }
}
