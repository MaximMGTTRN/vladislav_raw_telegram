import { MigrationInterface, QueryRunner } from "typeorm";

export class TgIdToString1675205864136 implements MigrationInterface {
    name = 'TgIdToString1675205864136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "tg_id"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "tg_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "tg_id"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "tg_id" integer NOT NULL`);
    }

}
