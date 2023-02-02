import { MigrationInterface, QueryRunner } from 'typeorm';


export class AddSurveyTable1675200814452 implements MigrationInterface {
  name = 'AddSurveyTable1675200814452';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "survey" (
        "id" SERIAL NOT NULL,
        "real_name" character varying NOT NULL,
        "age" integer, "living_place" character varying,
        "prefer" character varying,
        "web_link" character varying,
        "comment" character varying,
        "tg_user_name_for_connect" character varying NOT NULL,
        "person_id" integer,
        CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);

    await queryRunner.query('ALTER TABLE "person" ADD "person_name" character varying');
    await queryRunner.query('ALTER TABLE "person" ADD "is_bot" boolean');
    await queryRunner.query('ALTER TABLE "person" DROP COLUMN "tg_id"');
    await queryRunner.query('ALTER TABLE "person" ADD "tg_id" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "updated_at" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "updated_at" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "survey" ADD CONSTRAINT "FK_fdb94341a4455e26ecdb60a7ea5" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "survey" DROP CONSTRAINT "FK_fdb94341a4455e26ecdb60a7ea5"');
    await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "updated_at" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "updated_at" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "person" DROP COLUMN "tg_id"');
    await queryRunner.query('ALTER TABLE "person" ADD "tg_id" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "person" DROP COLUMN "is_bot"');
    await queryRunner.query('ALTER TABLE "person" DROP COLUMN "person_name"');
    await queryRunner.query('DROP TABLE "survey"');
  }
}
