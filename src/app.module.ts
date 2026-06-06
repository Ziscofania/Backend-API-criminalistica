import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DelitosModule } from './delitos/delitos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { TiposDelitoModule } from './tipos-delito/tipos-delito.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [PrismaModule, DelitosModule, UbicacionesModule, TiposDelitoModule, AdminModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
