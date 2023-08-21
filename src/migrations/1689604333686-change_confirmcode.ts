import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeConfirmcode1689604333686 implements MigrationInterface {
    name = 'ChangeConfirmcode1689604333686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" integer`);
    }

}
