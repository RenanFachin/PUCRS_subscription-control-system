import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from 'zod'

const clientsResponse = z.array(z.object({
  codigo: z.string().uuid(),
  nome: z.string(),
  email: z.string().email()
}))

type ClientsResponse = z.infer<typeof clientsResponse>

@Controller('/servcad/clientes')
export class ListAllClientsController {
  constructor(
    private prisma: PrismaService
  ) { }

  @Get()
  async handle(): Promise<ClientsResponse> {
    const clients = await this.prisma.cliente.findMany()

    return clients
  }
}