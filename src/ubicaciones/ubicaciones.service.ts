import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UbicacionesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ubicacion.findMany({
      include: {
        localidad: true,
        barrio: { include: { localidad: true } },
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.ubicacion.findUnique({
      where: { id },
      include: { localidad: true, barrio: { include: { localidad: true } } },
    });
    if (!record) throw new NotFoundException('Ubicacion not found');
    return record;
  }
}
