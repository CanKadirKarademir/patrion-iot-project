import { Controller, Post } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { ApiGenericHeader } from 'src/utils';
import { SensorDataInput } from 'models';

@ApiGenericHeader('MQTT')
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('notifications')
  getNotifications(
    @Payload() data: SensorDataInput,
    @Ctx() context: MqttContext,
  ) {
    this.mqttService.insertData(data);
  }

  @Post('send-notification')
  sendNotification() {
    this.mqttService.sendNotification();
  }
}
