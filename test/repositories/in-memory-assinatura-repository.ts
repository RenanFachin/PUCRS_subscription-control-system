import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'

export class InMemoryAssinaturaRepository implements AssinaturaRepository {
  public assinaturas: Assinatura[] = []

  async register(assinatura: Assinatura) {
    this.assinaturas.push(assinatura)
  }

  async findAll() {
    return this.assinaturas.map((assinatura) =>
      assinatura.getSubscriptionDetails(),
    )
  }

  async listByClient(codigoCliente: UniqueEntityCodigo) {
    const assinaturaCliente = this.assinaturas.filter(
      (assinatura) => assinatura.codCli === codigoCliente,
    )

    const assinaturas = assinaturaCliente.map((assinatura) =>
      assinatura.getSubscriptionDetails(),
    )

    return assinaturas
  }
}
