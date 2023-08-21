import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1689368063279 implements MigrationInterface {
    name = 'UpdateUser1689368063279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('Мужской', 'Женский')`);
        await queryRunner.query(`CREATE TYPE "public"."users_dormitory_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ')`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "personal_number" integer NOT NULL, "fullname" character varying NOT NULL, "gender" "public"."users_gender_enum", "citizenship" character varying, "faculty" character varying, "phone" character varying, "dormitory" "public"."users_dormitory_enum", CONSTRAINT "UQ_3f7680b4e3d65966baf246cc1d3" UNIQUE ("personal_number"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_dormitory_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
