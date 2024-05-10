import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { RegisterClienteDTO } from '../../dtos/register-client-dto'
import { RegisterClientUseCase } from '@/domain/application/use-cases/register-client'
import { CreateClientPresenter } from '../../presenters/client-presenter'

const registerClientBodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
})

type RegisterClientBodySchema = z.infer<typeof registerClientBodySchema>

@Controller('/servcad/clientes')
@ApiTags('Cliente')
export class RegisterClientController {
  constructor(private registerClient: RegisterClientUseCase) {}

  @ApiBody({
    type: RegisterClienteDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria um cliente.' })
  async handle(@Body() body: RegisterClientBodySchema) {
    const { nome, email } = registerClientBodySchema.parse(body)

    const result = await this.registerClient.execute({
      nome,
      email,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { cliente } = result.value

    return {
      cliente: CreateClientPresenter.toHTTP(cliente),
    }
  }
}
