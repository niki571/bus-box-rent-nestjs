import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import RentRecord from '../rent-record/rent-record.entity';

@Entity()
export default class TicketOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passengerId: number;

  @Column({ length: 20 })
  passengerName: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({ length: 20 })
  from: string;

  @Column({ length: 20 })
  to: string;

  @Column({ length: 20 })
  busNo: string;

  @Column({ length: 20 })
  ticketGate: string;

  @Column('datetime')
  departureTime: Date;

  @Column('datetime')
  arrivalTime: Date;

  @OneToMany(() => RentRecord, (rentRecord) => rentRecord.ticketOrder)
  rentRecords: RentRecord[];
}
