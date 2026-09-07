import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TrofeosModule } from './trofeos/trofeos.module';


@Module({
  imports: [PrismaModule, TrofeosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
