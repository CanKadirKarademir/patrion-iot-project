import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(
    @Inject('MQTT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async sendNotification() {
    const notificationPayload = Array.from({ length: 3 }, (_, index) => ({
      sensor_id: `sensor_${index}`,
      timestamp: Date.now(),
      temperature: Math.random() * 100,
      humidity: Math.random() * 100,
    }));

    notificationPayload.push({
      sensor_id: 'sensor_4',
      timestamp: Date.now(),
      temperature: null,
      humidity: null,
    });

    for (const payload of notificationPayload) {
      this.client.emit('notifications', payload);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 10 seconds delay
    }
  }
}
