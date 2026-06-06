import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TiposDelitoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tipoDelito.findMany({ select: { id: true, nombre: true, descripcion: true } });
  }
}
