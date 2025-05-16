import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTypeOnActionLog1747404155251 implements MigrationInterface {
    name = 'AddNewTypeOnActionLog1747404155251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."action_logs_type_enum" RENAME TO "action_logs_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."action_logs_type_enum" AS ENUM('success', 'failure', 'suspicious')`);
        await queryRunner.query(`ALTER TABLE "action_logs" ALTER COLUMN "type" TYPE "public"."action_logs_type_enum" USING "type"::"text"::"public"."action_logs_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."action_logs_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."action_logs_exception_type_enum" RENAME TO "action_logs_exception_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."action_logs_exception_type_enum" AS ENUM('typeorm', 'http', 'suspicious_data')`);
        await queryRunner.query(`ALTER TABLE "action_logs" ALTER COLUMN "exception_type" TYPE "public"."action_logs_exception_type_enum" USING "exception_type"::"text"::"public"."action_logs_exception_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."action_logs_exception_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."action_logs_exception_type_enum_old" AS ENUM('typeorm', 'http')`);
        await queryRunner.query(`ALTER TABLE "action_logs" ALTER COLUMN "exception_type" TYPE "public"."action_logs_exception_type_enum_old" USING "exception_type"::"text"::"public"."action_logs_exception_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."action_logs_exception_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."action_logs_exception_type_enum_old" RENAME TO "action_logs_exception_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."action_logs_type_enum_old" AS ENUM('success', 'failure')`);
        await queryRunner.query(`ALTER TABLE "action_logs" ALTER COLUMN "type" TYPE "public"."action_logs_type_enum_old" USING "type"::"text"::"public"."action_logs_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."action_logs_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."action_logs_type_enum_old" RENAME TO "action_logs_type_enum"`);
    }

}
