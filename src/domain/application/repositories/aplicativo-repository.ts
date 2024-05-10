import { Aplicativo } from '@/domain/enterprise/entities/aplicativos'

export interface AplicativoRepository {
  register(aplicativo: Aplicativo): Promise<void>
  findById(id: string): Promise<Aplicativo | null>
  findAll(): Promise<Aplicativo[] | null>
  edit(aplicativo: Aplicativo): Promise<void>
}
