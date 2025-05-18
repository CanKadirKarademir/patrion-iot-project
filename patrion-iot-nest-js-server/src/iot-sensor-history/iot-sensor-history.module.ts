import { Module } from '@nestjs/common';
import { IotSensorHistoryController } from './iot-sensor-history.controller';
import { IotSensorHistoryService } from './iot-sensor-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { iotSensorHistoryEntities } from './iot-sensor-history.entities';
import { InfluxDBService } from 'src/utils/services';

@Module({
  imports: [TypeOrmModule.forFeature([...iotSensorHistoryEntities])],
  controllers: [IotSensorHistoryController],
  providers: [IotSensorHistoryService, InfluxDBService],
})
export class IotSensorHistoryModule {}
