import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'

export class InMemoryAssinaturaRepository implements AssinaturaRepository {
  public assinaturas: Assinatura[] = []

  async register(assinatura: Assinatura) {
    this.assinaturas.push(assinatura)
  }

  async findAll() {
    return this.assinaturas
  }
}
