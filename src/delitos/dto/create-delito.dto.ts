import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateDelitoDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty()
  @IsInt()
  tipoDelitoId: number;

  @ApiProperty()
  @IsInt()
  ubicacionId: number;

  @ApiProperty()
  @IsInt()
  idEstado: number;
}
