import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActionTypeInActionLog1747397807037
  implements MigrationInterface
{
  name = 'AddActionTypeInActionLog1747397807037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."action_logs_action_type_enum" AS ENUM('default', 'viewed_logs')`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_logs" ADD "action_type" "public"."action_logs_action_type_enum" NOT NULL DEFAULT 'default'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "action_logs" DROP COLUMN "action_type"`);
    // await queryRunner.query(`DROP TYPE "public"."action_logs_action_type_enum"`);
  }
}
