import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IotSensorHistoryEntity } from 'database';
import { SensorDataInput } from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService {
  constructor(
    @Inject('MQTT_SERVICE')
    private readonly client: ClientProxy,

    @InjectRepository(IotSensorHistoryEntity)
    private iotSensorHistoryRepository: Repository<IotSensorHistoryEntity>,
  ) {}

  async sendNotification() {
    const notificationPayload: SensorDataInput[] = Array.from(
      { length: 3 },
      (_, index) => ({
        sensor_id: `sensor_${index}`,
        timestamp: Date.now(),
        temperature: Math.random() * 100,
        humidity: Math.random() * 100,
      }),
    );

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

  async insertData(data: SensorDataInput) {
    const sensorHistory = this.iotSensorHistoryRepository.create({
      sensor_id: data.sensor_id,
      timestamp: data.timestamp,
      humidity: data.humidity,
      temperature: data.temperature,
    });

    this.iotSensorHistoryRepository.save(sensorHistory);
  }
}
