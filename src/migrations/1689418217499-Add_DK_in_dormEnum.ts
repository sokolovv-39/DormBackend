import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDKInDormEnum1689418217499 implements MigrationInterface {
    name = 'AddDKInDormEnum1689418217499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."dormitories_name_enum" RENAME TO "dormitories_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ', 'ДК')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ALTER COLUMN "name" TYPE "public"."dormitories_name_enum" USING "name"::"text"::"public"."dormitories_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."dormitories_name_enum_old" AS ENUM('М-1', 'М-2', 'М-3', 'М-4', 'Г-1', 'Г-2', 'ДСГ')`);
        await queryRunner.query(`ALTER TABLE "dormitories" ALTER COLUMN "name" TYPE "public"."dormitories_name_enum_old" USING "name"::"text"::"public"."dormitories_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."dormitories_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."dormitories_name_enum_old" RENAME TO "dormitories_name_enum"`);
    }

}
