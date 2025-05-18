import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Type } from 'class-transformer';
import { mqttEntities } from './mqtt.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluxDBService } from 'src/utils/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          host: 'localhost',
          port: 1883,
          username: 'user2',
          password: '1234',
        },
      },
    ]),
    TypeOrmModule.forFeature([...mqttEntities]),
  ],
  controllers: [MqttController],
  providers: [MqttService, InfluxDBService],
})
export class MqttModule {}
