import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from './Surveys.entity';


@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tgId: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  personName?: string;

  @Column({ nullable: true })
  tgUsername?: string;

  @Column({ nullable: true })
  isBot?: boolean;

  @OneToMany(() => Survey, (survey) => survey.id)
  surveys: Survey[];
}
