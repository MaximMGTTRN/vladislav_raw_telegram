import { MigrationInterface, QueryRunner } from 'typeorm';


export class AddColumnToPerson1675203014086 implements MigrationInterface {
  name = 'AddColumnToPerson1675203014086';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "survey" RENAME COLUMN "tg_user_name_for_connect" TO "tg_username_for_connect"');
    await queryRunner.query('ALTER TABLE "person" ADD "tg_username" character varying NOT NULL');
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "person" DROP COLUMN "tg_username"');
    await queryRunner.query('ALTER TABLE "survey" RENAME COLUMN "tg_username_for_connect" TO "tg_user_name_for_connect"');
  }
}
