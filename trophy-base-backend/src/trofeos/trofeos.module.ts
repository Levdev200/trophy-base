import { Module } from '@nestjs/common';
import { TrofeosService } from './trofeos.service';
import { TrofeosController } from './trofeos.controller';

@Module({
  controllers: [TrofeosController],
  providers: [TrofeosService],
})
export class TrofeosModule {}
