import { Module } from '@nestjs/common';
import { CompanyIotSensorController } from './company-iot-sensor.controller';
import { CompanyIotSensorService } from './company-iot-sensor.service';
import { companyIotSensorEntities } from './company-iot-sensor.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([...companyIotSensorEntities])],
  controllers: [CompanyIotSensorController],
  providers: [CompanyIotSensorService],
})
export class CompanyIotSensorModule {}
