import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './Person.entity';

@Entity('survey')
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public realName: string

  @Column({ nullable: true })
  public age?: number

  @Column({ nullable: true })
  public livingPlace?: string

  @Column({ nullable: true })
  public prefer?: string

  @Column({ nullable: true })
  public webLink?: string

  @Column({ nullable: true })
  public comment?: string

  @Column({ nullable: false })
  public tgUsernameForConnect: string

  @ManyToOne(() => Person, person => person.id)
  public person: Person;
}