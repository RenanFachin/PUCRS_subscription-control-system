import { AplicativoRepository } from '@/domain/application/repositories/aplicativo-repository'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export class InMemoryAplicativoRepository implements AplicativoRepository {
  public aplicativos: Aplicativo[] = []

  async register(aplicativo: Aplicativo) {
    this.aplicativos.push(aplicativo)

    return aplicativo
  }

  async findById(id: string) {
    const aplicativo = this.aplicativos.find(
      (aplicativo) => aplicativo.codigo.toString() === id,
    )

    if (!aplicativo) {
      return null
    }

    return aplicativo
  }

  async findAll() {
    return this.aplicativos
  }

  async edit(editedApp: Aplicativo) {
    const appIndex = this.aplicativos.findIndex(
      (app) => app.codigo === editedApp.codigo,
    )

    this.aplicativos[appIndex] = editedApp
  }
}
