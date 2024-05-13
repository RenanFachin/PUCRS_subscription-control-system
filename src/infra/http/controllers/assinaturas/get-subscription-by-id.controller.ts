import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { isSubscriptionValidDto } from '../../dtos/get-client-subscription-dto'
import { GetSubscriptionByIdUseCase } from '@/domain/application/use-cases/get-subscription-by-id'

@Controller('/verifica/:id')
@ApiTags('Assinaturas')
export class GetSubscriptionByIdController {
  constructor(private getSubscriptionByIdUseCase: GetSubscriptionByIdUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista das assinaturas do cliente informado',
  })
  @ApiResponse({
    status: 200,
    description: 'List of client subscription details',
    type: [isSubscriptionValidDto],
  })
  @ApiResponse({ status: 400, description: 'Cliente não cadatrado.' })
  async handle(@Param('id') id: string) {
    console.log('codigoAssinatura:', id)

    const result = await this.getSubscriptionByIdUseCase.execute({
      codigoAssinatura: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    const status = result.value.status

    return {
      status,
    }
  }
}
