import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { AplicativoRepository } from '@/domain/application/repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export class InMemoryAplicativoRepository implements AplicativoRepository {
  public aplicativos: Aplicativo[] = []

  async register(aplicativo: Aplicativo) {
    this.aplicativos.push(aplicativo)
  }

  async findById(id: UniqueEntityCodigo) {
    const aplicativo = this.aplicativos.find(
      (aplicativo) => aplicativo.codigo === id,
    )

    if (!aplicativo) {
      return null
    }

    return aplicativo
  }
}
