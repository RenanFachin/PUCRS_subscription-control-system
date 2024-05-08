import { UniqueEntityCodigo } from '@/core/entities/unique-entity-codigo'
import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export interface AplicativoRepository {
  register(aplicativo: Aplicativo): Promise<void>
  findById(id: UniqueEntityCodigo): Promise<Aplicativo | null>
}
