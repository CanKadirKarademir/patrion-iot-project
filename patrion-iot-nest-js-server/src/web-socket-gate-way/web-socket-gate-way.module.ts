import { Module } from '@nestjs/common';
import { WebSocketGateWayService } from './web-socket-gate-way.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IotSensorHistoryEntity } from 'database';

@Module({
  imports: [TypeOrmModule.forFeature([IotSensorHistoryEntity])],
  providers: [WebSocketGateWayService],
})
export class WebSocketGateWayModule {}
