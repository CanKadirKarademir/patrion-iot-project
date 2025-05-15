import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIotSensors1747347997992 implements MigrationInterface {
  name = 'AddIotSensors1747347997992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "iot_sensors" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sensor_id" character varying, CONSTRAINT "UQ_fb764789c97d9d7328ee8fd423e" UNIQUE ("sensor_id"), CONSTRAINT "PK_20692186d94d9122a1ec92cac3c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP TABLE "iot_sensors"`);
  }
}
