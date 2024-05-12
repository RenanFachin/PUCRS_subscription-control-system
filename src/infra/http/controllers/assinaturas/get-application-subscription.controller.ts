import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApplicationSubscriptionDTO } from '../../dtos/get-application-subscription-dto'
import { GetApplicationSubscriptionUseCase } from '@/domain/application/use-cases/get-application-subscription'
import { AssinaturaWithStatusPresenter } from '../../presenters/subscription-presenter'

@Controller('/servcad/assapp/:codapp')
@ApiTags('Assinaturas')
export class GetApplicationSubscriptionController {
  constructor(
    private getApplicationSubscriptionUseCase: GetApplicationSubscriptionUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'List of client subscription details',
    type: [ApplicationSubscriptionDTO],
  })
  @ApiResponse({ status: 400, description: 'Aplicativo não cadatrado.' })
  async handle(@Param('codapp') codapp: string) {
    const result = await this.getApplicationSubscriptionUseCase.execute({
      codigoAplicativo: codapp,
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
