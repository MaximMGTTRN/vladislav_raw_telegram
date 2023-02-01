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
  public id: number;

  @Column({ nullable: false })
  public tgId: string;

  @Column({ nullable: false })
  public createdAt: Date;

  @Column({ nullable: true })
  public updatedAt?: Date;

  @Column({ nullable: true })
  public personName?: string

  @Column({ nullable: false })
  public tgUsername: string

  @Column({ nullable: true })
  public isBot?: boolean

  @OneToMany(() => Survey, survey => survey.id)
  public surveys: Survey[];
}
