import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';
import TicketOrder from '../ticket-order/ticket-order.entity';

@Entity()
export default class RentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rentRecords)
  user: User;

  @ManyToOne(() => TicketOrder, (ticketOrder) => ticketOrder.rentRecords)
  ticketOrder: TicketOrder;

  @Column()
  boxId: number;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;
}
