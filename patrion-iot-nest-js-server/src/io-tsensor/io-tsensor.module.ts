import { Module } from '@nestjs/common';
import { IoTsensorController } from './io-tsensor.controller';
import { IoTsensorService } from './io-tsensor.service';

@Module({
  controllers: [IoTsensorController],
  providers: [IoTsensorService]
})
export class IoTsensorModule {}
