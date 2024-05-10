import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { RegisterClienteDTO } from '../../dtos/register-client-dto'

const registerClientBodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
})

type RegisterClientBodySchema = z.infer<typeof registerClientBodySchema>

@Controller('/servcad/clientes')
@ApiTags('Cliente')
export class RegisterClientController {
  constructor(private prisma: PrismaService) {}

  @ApiBody({
    type: RegisterClienteDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria um cliente.' })
  async handle(
    @Body() body: RegisterClientBodySchema,
  ): Promise<{ codCli: string }> {
    const { nome, email } = registerClientBodySchema.parse(body)

    const clientWithSameEmail = await this.prisma.cliente.findUnique({
      where: {
        email,
      },
    })

    if (clientWithSameEmail) {
      throw new ConflictException('Cliente já cadastrado em nosso sistema.')
    }

    const cliente = await this.prisma.cliente.create({
      data: {
        nome,
        email,
      },
    })

    return {
      codCli: cliente.codigo,
    }
  }
}
