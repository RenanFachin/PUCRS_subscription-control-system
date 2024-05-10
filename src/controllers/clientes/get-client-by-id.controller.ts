import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { listAllClientsDTO } from 'src/dtos/list-all-clients-dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
@Controller('/servcad/client/:id')
@ApiTags('Cliente')
export class GetClientByIdController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna os dados de um usuário específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: listAllClientsDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado',
  })
  async handle(@Param('id') id: string): Promise<listAllClientsDTO> {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!cliente) {
      throw new BadRequestException('Usuário não encontrado.')
    }

    return cliente
  }
}
