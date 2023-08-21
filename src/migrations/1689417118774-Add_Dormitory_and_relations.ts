import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDormitoryAndRelations1689417118774 implements MigrationInterface {
    name = 'AddDormitoryAndRelations1689417118774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "dormitory" TO "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TYPE "public"."users_dormitory_enum" RENAME TO "users_dormitorydormitoryid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ')`);
        await queryRunner.query(`CREATE TABLE "dormitories" ("dormitory_id" SERIAL NOT NULL, "name" "public"."dormitories_name_enum" NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_bae67dd3e17c6e21ba0c8b5d9bf" UNIQUE ("address"), CONSTRAINT "PK_2dc3f13456b6b230ba6ab9349ba" PRIMARY KEY ("dormitory_id"))`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "dormitory"`);
        await queryRunner.query(`DROP TYPE "public"."admins_dormitory_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "is_show" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "position" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "dormitoryDormitoryId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitoryDormitoryId" integer`);
        await queryRunner.query(`ALTER TABLE "admins" ADD CONSTRAINT "FK_fb00a3fe68467df031488543d5d" FOREIGN KEY ("dormitoryDormitoryId") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_518459f32fd38406d8294501cc4" FOREIGN KEY ("dormitoryDormitoryId") REFERENCES "dormitories"("dormitory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_518459f32fd38406d8294501cc4"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP CONSTRAINT "FK_fb00a3fe68467df031488543d5d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dormitoryDormitoryId" "public"."users_dormitorydormitoryid_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "dormitoryDormitoryId"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "is_show"`);
        await queryRunner.query(`CREATE TYPE "public"."admins_dormitory_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ALL')`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "dormitory" "public"."admins_dormitory_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "dormitories"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_dormitorydormitoryid_enum" RENAME TO "users_dormitory_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "dormitoryDormitoryId" TO "dormitory"`);
    }

}
