import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SubscriptionDto } from '../../dtos/get-client-subscription-dto'
import { GetClientSubscriptionUseCase } from '@/domain/application/use-cases/get-client-subscription'
import { AssinaturaWithStatusPresenter } from '../../presenters/subscription-presenter'

@Controller('/servcad/asscli/:codcli')
@ApiTags('Assinaturas')
export class GetClientSubscriptionController {
  constructor(
    private getClientSubscriptionUseCase: GetClientSubscriptionUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'List of client subscription details',
    type: [SubscriptionDto],
  })
  @ApiResponse({ status: 400, description: 'Cliente não cadatrado.' })
  async handle(@Param('codcli') codcli: string) {
    const result = await this.getClientSubscriptionUseCase.execute({
      codigoCliente: codcli,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const assinaturas = result.value.assinaturas

    return {
      assinaturas: assinaturas.map(AssinaturaWithStatusPresenter.toHTTP),
    }
  }
}
