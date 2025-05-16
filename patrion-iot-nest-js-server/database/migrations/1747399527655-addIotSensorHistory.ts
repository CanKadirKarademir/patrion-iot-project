import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIotSensorHistory1747399527655 implements MigrationInterface {
  name = 'AddIotSensorHistory1747399527655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "iot_sensor_histories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sensor_id" character varying, "timestamp" TIMESTAMP, "humidity" integer, "temperature" integer, CONSTRAINT "PK_b6f10f43624fd3ac8acfe9421a8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP TABLE "iot_sensor_histories"`);
  }
}
