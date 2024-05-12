import { AssinaturaRepository } from '@/domain/application/repositories/assinatura-repository'
import { Assinatura } from '@/domain/enterprise/entities/assinaturas'

export class InMemoryAssinaturaRepository implements AssinaturaRepository {
  public assinaturas: Assinatura[] = []

  async register(assinatura: Assinatura) {
    this.assinaturas.push(assinatura)

    return assinatura
  }

  async findAll() {
    return this.assinaturas.map((assinatura) =>
      assinatura.getSubscriptionDetails(),
    )
  }

  async listByClient(id: string) {
    const assinaturaCliente = this.assinaturas.filter(
      (assinatura) => assinatura.codCli.toString() === id,
    )

    const assinaturas = assinaturaCliente.map((assinatura) =>
      assinatura.getSubscriptionDetails(),
    )

    return assinaturas
  }

  async listByApp(id: string) {
    const assinaturaCliente = this.assinaturas.filter(
      (assinatura) => assinatura.codApp.toString() === id,
    )

    const assinaturas = assinaturaCliente.map((assinatura) =>
      assinatura.getSubscriptionDetails(),
    )

    return assinaturas
  }

  async findByClientIdAndAppId(
    clientId: string,
    appId: string,
  ): Promise<Assinatura | null> {
    return new Promise((resolve) => {
      const assinaturaEncontrada = this.assinaturas.find(
        (assinatura) =>
          assinatura.codCli.toString() === clientId &&
          assinatura.codApp.toString() === appId,
      )

      resolve(assinaturaEncontrada || null)
    })
  }
}
