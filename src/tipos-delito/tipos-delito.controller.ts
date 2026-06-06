import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TiposDelitoService } from './tipos-delito.service';

@ApiTags('TiposDelito')
@Controller('api/tipos-delito')
export class TiposDelitoController {
  constructor(private readonly service: TiposDelitoService) {}

  @Get()
  @ApiOperation({ summary: 'List all tipos de delito' })
  @ApiResponse({ status: 200, description: 'List of tipos delito' })
  async findAll() {
    return this.service.findAll();
  }
}
