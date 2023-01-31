import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPersonTable1675115640379 implements MigrationInterface {
    name = 'AddPersonTable1675115640379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        `CREATE TABLE "person"
            ("id" SERIAL NOT NULL, "tg_id" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL,
            "updated_at" TIMESTAMP NOT NULL,
            CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
