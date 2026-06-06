import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const totalCrimes = await this.prisma.delito.count();

    const crimesByTypeRaw = await this.prisma.$queryRawUnsafe(`SELECT td.nombre, count(*) as count FROM "Delito" d JOIN "TipoDelito" td ON d."tipoDelitoId" = td.id GROUP BY td.nombre`);
    const crimesByType = {} as any;
    crimesByTypeRaw.forEach((r: any) => (crimesByType[r.nombre] = Number(r.count)));

    const crimesTrendRaw = await this.prisma.$queryRawUnsafe(`SELECT date_trunc('day', fecha) as day, count(*) as count FROM "Delito" GROUP BY day ORDER BY day DESC LIMIT 30`);
    const crimesTrend = (crimesTrendRaw as any[]).map((r) => ({ date: r.day.toISOString(), count: Number(r.count) }));

    const totalUsers = await this.prisma.usuario.count();
    const activeUsers = await this.prisma.usuario.count({ where: { isActive: true } });
    const inactiveUsers = totalUsers - activeUsers;
    const recentUsers = await this.prisma.usuario.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });

    return {
      statistics: {
        totalCrimes,
        crimesByType,
        crimesByLocation: {},
        crimesTrend,
      },
      userManagement: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        recentUsers,
      },
      systemHealth: {
        status: 'healthy',
        uptime: process.uptime(),
        dbStatus: 'connected',
      },
    };
  }

  async users() {
    return this.prisma.usuario.findMany();
  }

  async getUser(id: string) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: any) {
    return this.prisma.usuario.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    await this.prisma.usuario.delete({ where: { id } });
    return { success: true };
  }

  async setUserActive(id: string, active: boolean) {
    return this.prisma.usuario.update({ where: { id }, data: { isActive: active } });
  }
}
