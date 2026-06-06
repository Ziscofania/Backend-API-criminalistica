import { PartialType } from '@nestjs/swagger';
import { CreateDelitoDto } from './create-delito.dto';

export class UpdateDelitoDto extends PartialType(CreateDelitoDto) {}
