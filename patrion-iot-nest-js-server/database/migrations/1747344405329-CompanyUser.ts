import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompanyUser1747344405329 implements MigrationInterface {
  name = 'CompanyUser1747344405329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company_users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "company_id" uuid NOT NULL, CONSTRAINT "PK_fcd31773e604355d8a473de888c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_users" ADD CONSTRAINT "fk_company_user_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_users" ADD CONSTRAINT "fk_company_user_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "company_users" DROP CONSTRAINT "fk_company_user_company_id"`);
    // await queryRunner.query(`ALTER TABLE "company_users" DROP CONSTRAINT "fk_company_user_user_id"`);
    // await queryRunner.query(`DROP TABLE "company_users"`);
  }
}
