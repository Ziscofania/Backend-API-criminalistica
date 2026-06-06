import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('api/admin/settings')
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get()
  async get() {
    return this.service.getAll();
  }

  @Put()
  async put(@Body() body: { key: string; value: string }) {
    return this.service.update(body.key, body.value);
  }
}
