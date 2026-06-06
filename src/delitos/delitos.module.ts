import { Module } from '@nestjs/common';
import { DelitosController } from './delitos.controller';
import { DelitosService } from './delitos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DelitosController],
  providers: [DelitosService],
})
export class DelitosModule {}
