import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('countries')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
