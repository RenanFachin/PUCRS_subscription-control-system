import { UseCaseError } from '@/core/errors/use-case-error'

export class SubscriptionNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Assinatura não encontrado.')
  }
}
