import {
  BadRequestException,
  Controller,
  Patch,
  Param,
  Body,
} from '@nestjs/common'
import { PrismaService } from '@/infra/prisma/prisma.service'
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'
import { listAllClientsDTO } from '../../dtos/list-all-clients-dto'

const updateClientBodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
})

type UpdateClientBodySchema = z.infer<typeof updateClientBodySchema>

class UpdateBodySwagger {
  @ApiProperty()
  nome: string

  @ApiProperty()
  email: string
}

@Controller('/servcad/client/:id')
@ApiTags('Cliente')
export class EditClientController {
  constructor(private prisma: PrismaService) {}

  @ApiBody({
    type: UpdateBodySwagger,
  })
  @Patch()
  @ApiOperation({
    summary: 'Edita os dados cadastrados por um cliente.',
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
  async handle(
    @Param('id') id: string,
    @Body() body: UpdateClientBodySchema,
  ): Promise<listAllClientsDTO> {
    const { nome, email } = updateClientBodySchema.parse(body)

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        codigo: id,
      },
    })

    if (!cliente) {
      throw new BadRequestException('Usuário não encontrado.')
    }

    if (cliente.email === email || cliente.nome === nome) {
      throw new BadRequestException(
        'Email ou nome que você informou já é o cadastrado.',
      )
    }

    const updatedClient = await this.prisma.cliente.update({
      where: {
        codigo: cliente.codigo,
      },
      data: {
        nome,
        email,
      },
    })

    return updatedClient
  }
}
