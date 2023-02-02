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
  id: number;

  @Column({ nullable: false })
  realName: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  livingPlace?: string;

  @Column({ nullable: true })
  prefer?: string;

  @Column({ nullable: true })
  webLink?: string;

  @Column({ nullable: true })
  comment?: string;

  @Column({ nullable: false })
  tgUsernameForConnect: string;

  @ManyToOne(() => Person, (person) => person.id)
  person: Person;
}
