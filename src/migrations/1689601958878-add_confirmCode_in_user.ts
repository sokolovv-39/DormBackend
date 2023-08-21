import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfirmCodeInUser1689601958878 implements MigrationInterface {
    name = 'AddConfirmCodeInUser1689601958878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "code_confirm" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code_confirm"`);
    }

}
