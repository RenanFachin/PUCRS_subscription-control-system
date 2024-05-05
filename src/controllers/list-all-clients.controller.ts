import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

import { ApiOperation, ApiTags } from '@nestjs/swagger'

const clientsResponse = z.array(
  z.object({
    codigo: z.string().uuid(),
    nome: z.string(),
    email: z.string().email(),
  }),
)

type ClientsResponse = z.infer<typeof clientsResponse>

@Controller('/servcad/clientes')
@ApiTags('Cliente')
export class ListAllClientsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) { }

  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de todos os clientes cadastrados.',
  })
  async handle(): Promise<ClientsResponse> {
    const clients = await this.prisma.cliente.findMany()

    return clients
  }
}
