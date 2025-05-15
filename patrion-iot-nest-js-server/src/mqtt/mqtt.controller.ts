import { Controller, Post } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { ApiGenericHeader } from 'src/utils';

@ApiGenericHeader('MQTT')
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('notifications')
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log('data', data);
  }

  @Post('send-notification')
  sendNotification() {
    this.mqttService.sendNotification();
  }
}
