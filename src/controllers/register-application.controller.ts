import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const registerApplicationBodySchema = z.object({
  nome: z.string(),
  custoMensal: z.number(),
})

type RegisterApllicationBodySchema = z.infer<
  typeof registerApplicationBodySchema
>

@Controller('/servcad/aplicativos')
export class RegisterApllicationController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
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
