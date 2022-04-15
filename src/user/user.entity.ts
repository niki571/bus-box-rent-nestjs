import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import RentRecord from '../rent-record/rent-record.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @OneToMany(() => RentRecord, (rentRecord) => rentRecord.user)
  rentRecords: RentRecord[];
}
