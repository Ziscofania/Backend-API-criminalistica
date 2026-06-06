import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UbicacionesService } from './ubicaciones.service';

@ApiTags('Ubicaciones')
@Controller('api/ubicaciones')
export class UbicacionesController {
  constructor(private readonly service: UbicacionesService) {}

  @Get()
  @ApiOperation({ summary: 'List all ubicaciones' })
  @ApiResponse({ status: 200, description: 'List of ubicaciones' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ubicacion by id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
