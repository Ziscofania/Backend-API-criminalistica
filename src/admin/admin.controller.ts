import { Controller, Get, Param, Put, Delete, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('api/admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Admin dashboard' })
  async dashboard() {
    return this.service.dashboard();
  }

  @Get('users')
  async users() {
    return this.service.users();
  }

  @Get('users/:id')
  @ApiParam({ name: 'id' })
  async getUser(@Param('id') id: string) {
    return this.service.getUser(id);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    return this.service.updateUser(id, body);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }

  @Patch('users/:id/disable')
  async disableUser(@Param('id') id: string) {
    return this.service.setUserActive(id, false);
  }

  @Patch('users/:id/enable')
  async enableUser(@Param('id') id: string) {
    return this.service.setUserActive(id, true);
  }

  @Get('settings')
  async settings() {
    const s = await this.service['prisma'].setting.findMany();
    return s;
  }

  @Get('audit-logs')
  async auditLogs() {
    return this.service['prisma'].auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  }

  @Get('system-health')
  async systemHealth() {
    return { status: 'healthy', uptime: process.uptime(), dbStatus: 'connected' };
  }
}
