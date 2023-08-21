import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEducationLevel1691222050629 implements MigrationInterface {
    name = 'AddEducationLevel1691222050629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_education_level_enum" AS ENUM('Бакалавр', 'Магистр', 'Аспирант', 'Слушатель', 'Специалист')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "education_level" "public"."users_education_level_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "education_level"`);
        await queryRunner.query(`DROP TYPE "public"."users_education_level_enum"`);
    }

}
