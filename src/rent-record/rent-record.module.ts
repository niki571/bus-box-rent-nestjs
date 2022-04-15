import { Module } from '@nestjs/common';
import { RentRecordController } from './rent-record.controller';
import { RentRecordService } from './rent-record.service';

@Module({
  controllers: [RentRecordController],
  providers: [RentRecordService],
})
export class RentRecordModule {}
