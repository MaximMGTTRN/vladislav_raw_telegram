import { MigrationInterface, QueryRunner } from 'typeorm';


export class AddDateSurveyColumn1676895825407 implements MigrationInterface {
    name = 'AddDateSurveyColumn1676895825407';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "survey" ADD "created_at" TIMESTAMP');
        await queryRunner.query('UPDATE survey SET created_at = now() WHERE 1=1');
        await queryRunner.query('ALTER TABLE "survey" ALTER COLUMN "created_at" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "tg_username" DROP NOT NULL');
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "person" ALTER COLUMN "tg_username" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "survey" DROP COLUMN "created_at"');
    }
}
