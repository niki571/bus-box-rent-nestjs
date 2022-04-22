/*
 * @Author: wuqianying
 * @Date: 2022-03-31 12:42:42
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-04-23 00:25:08
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketOrderModule } from './ticket-order/ticket-order.module';
import { UserModule } from './user/user.module';
import { BusBoxesInfoModule } from './bus-boxes-info/bus-boxes-info.module';
import { RentRecordModule } from './rent-record/rent-record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TicketOrderModule,
    UserModule,
    BusBoxesInfoModule,
    RentRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
