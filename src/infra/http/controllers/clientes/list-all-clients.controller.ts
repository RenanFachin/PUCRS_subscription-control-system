import { Controller, Get } from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { listAllClientsDTO } from '../../dtos/list-all-clients-dto'
import { ListAllClientsUseCase } from '@/domain/application/use-cases/list-all-clients'
import { ClientPresenter } from '../../presenters/client-presenter'

@Controller('/servcad/clientes')
@ApiTags('Cliente')
export class ListAllClientsController {
  constructor(private listAllClients: ListAllClientsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de todos os clientes cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [listAllClientsDTO],
  })
  async handle() {
    const result = await this.listAllClients.execute()

    if (result.isLeft()) {
      throw new Error()
    }

    const clientes = result.value.clientes

    return { clientes: clientes.map(ClientPresenter.toHTTP) }
  }
}
