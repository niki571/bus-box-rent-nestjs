import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusBoxesInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  busNo: string;

  @Column('text')
  boxes: string; //JSON.stringify化的舱位信息
}
