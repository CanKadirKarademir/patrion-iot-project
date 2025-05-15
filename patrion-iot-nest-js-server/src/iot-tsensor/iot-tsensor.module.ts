import { Module } from '@nestjs/common';
import { IotSensorController } from './iot-tsensor.controller';
import { IotSensorService } from './iot-tsensor.service';
import { Type } from 'class-transformer';
import { iotSensorEntities } from './iot-sensor.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([...iotSensorEntities])],
  controllers: [IotSensorController],
  providers: [IotSensorService],
})
export class IotSensorModule {}
