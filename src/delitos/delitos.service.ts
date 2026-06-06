import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDelitoDto } from './dto/create-delito.dto';

@Injectable()
export class DelitosService {
  constructor(private prisma: PrismaService) {}

  private mapDelito(d: any) {
    return {
      id: d.id,
      nombre: d.nombre,
      descripcion: d.descripcion || null,
      fecha: d.fecha.toISOString(),
      tipoDelito: d.tipoDelito ? { id: d.tipoDelito.id, nombre: d.tipoDelito.nombre } : null,
      ubicacion: d.ubicacion
        ? {
            id: d.ubicacion.id,
            localidad: d.ubicacion.localidad ? { id: d.ubicacion.localidad.id, nombre: d.ubicacion.localidad.nombre } : null,
            barrio: d.ubicacion.barrio
              ? {
                  id: d.ubicacion.barrio.id,
                  nombre: d.ubicacion.barrio.nombre,
                  localidad: d.ubicacion.barrio.localidad ? { id: d.ubicacion.barrio.localidad.id, nombre: d.ubicacion.barrio.localidad.nombre } : null,
                }
              : null,
            latitud: d.ubicacion.latitud,
            longitud: d.ubicacion.longitud,
          }
        : null,
      idEstado: d.idEstado,
    };
  }

  async findAll() {
    const delitos = await this.prisma.delito.findMany({
      include: { tipoDelito: true, ubicacion: { include: { localidad: true, barrio: { include: { localidad: true } } } } },
    });
    return delitos.map((d) => this.mapDelito(d));
  }

  async findOne(id: number) {
    const d = await this.prisma.delito.findUnique({
      where: { id },
      include: { tipoDelito: true, ubicacion: { include: { localidad: true, barrio: { include: { localidad: true } } } } },
    });
    if (!d) throw new NotFoundException('Delito not found');
    return this.mapDelito(d);
  }

  async create(dto: CreateDelitoDto) {
    const fecha = dto.fecha ? new Date(dto.fecha) : undefined;
    const created = await this.prisma.delito.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        fecha: fecha,
        tipoDelitoId: dto.tipoDelitoId,
        ubicacionId: dto.ubicacionId,
        idEstado: dto.idEstado,
      },
      include: { tipoDelito: true, ubicacion: { include: { localidad: true, barrio: { include: { localidad: true } } } } },
    });
    return this.mapDelito(created);
  }

  async update(id: number, dto: Partial<CreateDelitoDto>) {
    const data: any = { ...dto };
    if (dto.fecha) data.fecha = new Date(dto.fecha as any);
    const updated = await this.prisma.delito.update({
      where: { id },
      data,
      include: { tipoDelito: true, ubicacion: { include: { localidad: true, barrio: { include: { localidad: true } } } } },
    });
    return this.mapDelito(updated);
  }

  async remove(id: number) {
    await this.prisma.delito.delete({ where: { id } });
    return { success: true };
  }
}
