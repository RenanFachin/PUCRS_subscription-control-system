import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RegisterApplicationDTO } from 'src/dtos/register-application-dto'

const registerApplicationBodySchema = z.object({
  nome: z.string(),
  custoMensal: z.number(),
})

type RegisterApllicationBodySchema = z.infer<
  typeof registerApplicationBodySchema
>

@Controller('/servcad/aplicativos')
@ApiTags('Aplicativos')
export class RegisterApllicationController {
  constructor(private prisma: PrismaService) {}

  @ApiBody({
    type: RegisterApplicationDTO,
  })
  @Post()
  @ApiOperation({ summary: 'Cria um aplicativo.' })
  async handle(@Body() body: RegisterApllicationBodySchema) {
    const { nome, custoMensal } = registerApplicationBodySchema.parse(body)

    const isApplicationAlreadyRegistered =
      await this.prisma.aplicativo.findUnique({
        where: {
          nome,
        },
      })

    if (isApplicationAlreadyRegistered) {
      throw new ConflictException('Aplicativo já cadastrado em nosso sistema.')
    }

    await this.prisma.aplicativo.create({
      data: {
        nome,
        custoMensal,
      },
    })
  }
}
