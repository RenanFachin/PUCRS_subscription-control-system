import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const registerClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

type RegisterClientBodySchema = z.infer<typeof registerClientBodySchema>

@Controller('/client')
export class RegisterClientController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  async handle(@Body() body: RegisterClientBodySchema) {
    const { name, email } = registerClientBodySchema.parse(body)

    const clientWithSameEmail = await this.prisma.cliente.findUnique({
      where: {
        email,
      },
    })

    if (clientWithSameEmail) {
      throw new ConflictException(
        'Client with same e-mail address already registered',
      )
    }

    await this.prisma.cliente.create({
      data: {
        nome: name,
        email,
      },
    })
  }
}
