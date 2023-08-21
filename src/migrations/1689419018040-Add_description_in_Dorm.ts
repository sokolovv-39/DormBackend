import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionInDorm1689419018040 implements MigrationInterface {
    name = 'AddDescriptionInDorm1689419018040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP COLUMN "description"`);
    }

}
