import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneAdmin1690803976125 implements MigrationInterface {
    name = 'AddPhoneAdmin1690803976125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "phone"`);
    }

}
