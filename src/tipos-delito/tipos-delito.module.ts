import { Module } from '@nestjs/common';
import { TiposDelitoController } from './tipos-delito.controller';
import { TiposDelitoService } from './tipos-delito.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TiposDelitoController],
  providers: [TiposDelitoService],
})
export class TiposDelitoModule {}
