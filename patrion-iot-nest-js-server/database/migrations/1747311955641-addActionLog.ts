import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActionLog1747311955641 implements MigrationInterface {
  name = 'AddActionLog1747311955641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."action_logs_type_enum" AS ENUM('success', 'failure')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."action_logs_exception_type_enum" AS ENUM('typeorm', 'http')`,
    );
    await queryRunner.query(
      `CREATE TABLE "action_logs" ("id" SERIAL NOT NULL, "user_id" character varying, "ip" character varying, "url" character varying, "type" "public"."action_logs_type_enum" NOT NULL, "exception_type" "public"."action_logs_exception_type_enum", "body" json, "headers" json, "method" character varying, "status_code" integer, "typeorm_code" character varying, "message" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cc15d2a348eaf2e1e153055380c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP TABLE "action_logs"`);
    // await queryRunner.query(`DROP TYPE "public"."action_logs_exception_type_enum"`);
    // await queryRunner.query(`DROP TYPE "public"."action_logs_type_enum"`);
  }
}
