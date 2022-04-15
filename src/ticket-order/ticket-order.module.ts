import { Module } from '@nestjs/common';
import { TicketOrderController } from './ticket-order.controller';
import { TicketOrderService } from './ticket-order.service';

@Module({
  controllers: [TicketOrderController],
  providers: [TicketOrderService],
})
export class TicketOrderModule {}
