import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyIotSensor1747389474573 implements MigrationInterface {
  name = 'AddCompanyIotSensor1747389474573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company_iot_sensors" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "company_id" uuid NOT NULL, "iot_sensor_id" uuid NOT NULL, CONSTRAINT "PK_e8f5a724cf1ee8dad99c4c843bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_iot_sensors" ADD CONSTRAINT "fk_company_iot_sensors_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_iot_sensors" ADD CONSTRAINT "fk_company_iot_sensors_company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_iot_sensors" ADD CONSTRAINT "fk_company_iot_sensors_iot_sensor_id" FOREIGN KEY ("iot_sensor_id") REFERENCES "iot_sensors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "company_iot_sensors" DROP CONSTRAINT "fk_company_iot_sensors_iot_sensor_id"`);
    // await queryRunner.query(`ALTER TABLE "company_iot_sensors" DROP CONSTRAINT "fk_company_iot_sensors_company_id"`);
    // await queryRunner.query(`ALTER TABLE "company_iot_sensors" DROP CONSTRAINT "fk_company_iot_sensors_user_id"`);
    // await queryRunner.query(`DROP TABLE "company_iot_sensors"`);
  }
}
