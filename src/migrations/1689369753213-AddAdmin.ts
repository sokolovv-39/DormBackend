import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1689369753213 implements MigrationInterface {
    name = 'AddAdmin1689369753213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admins_admin_type_enum" AS ENUM('Главный админ', 'Комендант', 'Студсовет')`);
        await queryRunner.query(`CREATE TYPE "public"."admins_dormitory_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ALL')`);
        await queryRunner.query(`CREATE TABLE "admins" ("admin_id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "fullname" character varying NOT NULL, "admin_type" "public"."admins_admin_type_enum" NOT NULL, "dormitory" "public"."admins_dormitory_enum" NOT NULL, CONSTRAINT "UQ_3d704d9a959cb04ba6f7e942ddb" UNIQUE ("login"), CONSTRAINT "PK_88070d08be64522fc84fdefef85" PRIMARY KEY ("admin_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TYPE "public"."admins_dormitory_enum"`);
        await queryRunner.query(`DROP TYPE "public"."admins_admin_type_enum"`);
    }

}
