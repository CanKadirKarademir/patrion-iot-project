import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditedTypesIotSensorHistory1747401334903
  implements MigrationInterface
{
  name = 'EditedTypesIotSensorHistory1747401334903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" DROP COLUMN "humidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" ADD "humidity" numeric(12,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" DROP COLUMN "temperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" ADD "temperature" numeric(12,6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" DROP COLUMN "temperature"`);
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" ADD "temperature" integer`);
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" DROP COLUMN "humidity"`);
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" ADD "humidity" integer`);
  }
}
