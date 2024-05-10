import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { RegisterClienteDTO } from '../../dtos/register-client-dto'
import { RegisterClientUseCase } from '@/domain/application/use-cases/register-client'

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

    const { cliente } = await this.registerClient.execute({
      nome,
      email,
    })

    return {
      codCli: cliente.codigo.toString(),
    }
  }
}
