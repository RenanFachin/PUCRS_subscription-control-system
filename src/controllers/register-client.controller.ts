import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RegisterClienteDTO } from 'src/dtos/register-client-dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

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
  async handle(@Body() body: RegisterClientBodySchema) {
    const { nome, email } = registerClientBodySchema.parse(body)

    const clientWithSameEmail = await this.prisma.cliente.findUnique({
      where: {
        email,
      },
    })

    if (clientWithSameEmail) {
      throw new ConflictException('Cliente já cadastrado em nosso sistema.')
    }

    await this.prisma.cliente.create({
      data: {
        nome,
        email,
      },
    })
  }
}
