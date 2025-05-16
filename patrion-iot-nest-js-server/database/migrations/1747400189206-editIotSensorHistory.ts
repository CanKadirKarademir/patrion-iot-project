import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditIotSensorHistory1747400189206 implements MigrationInterface {
  name = 'EditIotSensorHistory1747400189206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "iot_sensor_histories" ADD "timestamp" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" DROP COLUMN "timestamp"`);
    // await queryRunner.query(`ALTER TABLE "iot_sensor_histories" ADD "timestamp" TIMESTAMP`);
  }
}
