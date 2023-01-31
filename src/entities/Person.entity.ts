import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public tgId: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
