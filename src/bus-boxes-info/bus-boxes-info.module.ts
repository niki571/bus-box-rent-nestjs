import { Module } from '@nestjs/common';
import { BusBoxesInfoController } from './bus-boxes-info.controller';
import { BusBoxesInfoService } from './bus-boxes-info.service';

@Module({
  controllers: [BusBoxesInfoController],
  providers: [BusBoxesInfoService],
})
export class BusBoxesInfoModule {}
