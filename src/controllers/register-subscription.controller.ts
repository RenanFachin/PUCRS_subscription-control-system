import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { createsSubscriptionValidity } from 'src/utils/creates-subscription-validity'
import { z } from 'zod'

const registerSubscriptionBodySchema = z.object({
  codApp: z.string().uuid(),
  codCli: z.string().uuid()
})

type RegisterSubscriptionBodySchema = z.infer<typeof registerSubscriptionBodySchema>

@Controller('/servcad/assinaturas')
export class RegisterSubscriptionController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  async handle(@Body() body: RegisterSubscriptionBodySchema) {
    const { codApp, codCli } = registerSubscriptionBodySchema.parse(body)


    /**
     * [x] - Verificar se o cliente existe
     * [x] - Verificar se o aplicativo existe
     * [x] - Verificar se já existe uma assinatura válida desde cliente e aplicativo
     * [x] - Realizar a criação do registro
    */

    const Client = await this.prisma.cliente.findFirst({
      where: {
        codigo: codCli
      }
    })

    const Application = await this.prisma.aplicativo.findFirst({
      where: {
        codigo: codApp
      }
    })

    if (!Client || !Application) {
      throw new NotFoundException('Usuário ou Aplicativo não encontrados.')
    }


    const isClientAlreadyRegisteredInThisApplication = await this.prisma.assinatura.findFirst({
      where: {
        codApp,
        codCli
      }
    })

    if (isClientAlreadyRegisteredInThisApplication) {
      throw new BadRequestException('Usuário já registrado neste aplicativo')
    }


    const subscription = await this.prisma.assinatura.create({
      data: {
        codApp,
        codCli,
        fimVigencia: createsSubscriptionValidity()
      }
    })

    return {
      subscription
    }
  }
}
