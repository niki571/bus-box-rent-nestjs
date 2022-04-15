import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketOrderModule } from './ticket-order/ticket-order.module';
import { UserModule } from './user/user.module';
import { BusBoxesInfoModule } from './bus-boxes-info/bus-boxes-info.module';
import { RentRecordModule } from './rent-record/rent-record.module';
import { WeixinModule } from './weixin/weixin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TicketOrderModule,
    UserModule,
    BusBoxesInfoModule,
    RentRecordModule,
    WeixinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
