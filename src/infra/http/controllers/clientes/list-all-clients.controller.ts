import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { listAllClientsDTO } from '../../dtos/list-all-clients-dto'

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
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [listAllClientsDTO],
  })
  async handle(): Promise<ClientsResponse> {
    const clients = await this.prisma.cliente.findMany()

    return clients
  }
}
