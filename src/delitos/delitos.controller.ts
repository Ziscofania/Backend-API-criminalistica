import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DelitosService } from './delitos.service';
import { CreateDelitoDto } from './dto/create-delito.dto';
import { UpdateDelitoDto } from './dto/update-delito.dto';

@ApiTags('Delitos')
@Controller('api/delitos')
export class DelitosController {
  constructor(private readonly service: DelitosService) {}

  @Get()
  @ApiOperation({ summary: 'List all delitos' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateDelitoDto })
  async create(@Body() dto: CreateDelitoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDelitoDto) {
    return this.service.update(id, dto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
