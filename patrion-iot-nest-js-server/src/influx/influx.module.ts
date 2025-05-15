import { Module } from '@nestjs/common';
import { InfluxController } from './influx.controller';
import { InfluxService } from './influx.service';
import { InfluxDBService } from 'src/utils/services';

@Module({
  controllers: [InfluxController],
  providers: [InfluxService, InfluxDBService],
})
export class InfluxModule {}
