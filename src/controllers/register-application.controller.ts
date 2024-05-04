import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const registerApplicationBodySchema = z.object({
  name: z.string(),
  monthlyCost: z.number(),
})

type RegisterApllicationBodySchema = z.infer<
  typeof registerApplicationBodySchema
>

@Controller('/servcad/aplicativos')
export class RegisterApllicationController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: RegisterApllicationBodySchema) {
    const { name, monthlyCost } = registerApplicationBodySchema.parse(body)

    await this.prisma.aplicativo.create({
      data: {
        nome: name,
        custoMensal: monthlyCost,
      },
    })
  }
}
