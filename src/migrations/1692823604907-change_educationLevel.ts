import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEducationLevel1692823604907 implements MigrationInterface {
    name = 'ChangeEducationLevel1692823604907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_education_level_enum" RENAME TO "users_education_level_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_education_level_enum" AS ENUM('Бакалавр', 'Магистр', 'Аспирант', 'Специалист', 'Под.отделение')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "education_level" TYPE "public"."users_education_level_enum" USING "education_level"::"text"::"public"."users_education_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_education_level_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_education_level_enum_old" AS ENUM('Бакалавр', 'Магистр', 'Аспирант', 'Слушатель', 'Специалист')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "education_level" TYPE "public"."users_education_level_enum_old" USING "education_level"::"text"::"public"."users_education_level_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_education_level_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_education_level_enum_old" RENAME TO "users_education_level_enum"`);
    }

}
