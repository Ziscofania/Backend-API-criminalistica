import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.setting.findMany();
  }

  async update(key: string, value: string) {
    const existing = await this.prisma.setting.findUnique({ where: { key } });
    if (existing) return this.prisma.setting.update({ where: { key }, data: { value } });
    return this.prisma.setting.create({ data: { key, value } });
  }
}
