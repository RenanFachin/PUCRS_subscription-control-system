import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { listAllClientsDTO } from '../../dtos/list-all-clients-dto'
import { GetClientByIdUseCase } from '@/domain/application/use-cases/get-client-by-id'
import { ClientPresenter } from '../../presenters/client-presenter'
@Controller('/servcad/client/:id')
@ApiTags('Cliente')
export class GetClientByIdController {
  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna os dados de um usuário específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: listAllClientsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Cliente não encontrado',
  })
  async handle(@Param('id') id: string) {
    const result = await this.getClientByIdUseCase.execute({ codigo: id })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const cliente = result.value.cliente

    return { cliente: ClientPresenter.toHTTP(cliente) }
  }
}
