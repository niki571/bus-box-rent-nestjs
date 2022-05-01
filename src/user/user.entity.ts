import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import RentRecord from '../rent-record/rent-record.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  openid: string;

  @Column({ length: 11 })
  phonenumber: string;

  @OneToMany(() => RentRecord, (rentRecord) => rentRecord.user)
  rentRecords: RentRecord[];
}
