import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueNameDorm1689420028498 implements MigrationInterface {
    name = 'AddUniqueNameDorm1689420028498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" ADD CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dormitories" DROP CONSTRAINT "UQ_2b1f4c79a18eab371132ee8ed05"`);
    }

}
