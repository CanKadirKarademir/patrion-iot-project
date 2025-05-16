import { Inject, Injectable, Type } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IotSensorHistoryEntity } from 'database';
import { CreateSuspiciousDataEvent, SensorDataInput } from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService {
  constructor(
    @Inject('MQTT_SERVICE')
    private readonly client: ClientProxy,
    @InjectRepository(IotSensorHistoryEntity)
    private iotSensorHistoryRepository: Repository<IotSensorHistoryEntity>,
    private _eventEmitter: EventEmitter2,
  ) {}

  async sendNotification() {
    const notificationPayload: SensorDataInput[] = Array.from(
      { length: 3 },
      (_, index) => ({
        sensor_id: `sensor_${index}`,
        timestamp: new Date(),
        temperature: Math.random() * 100,
        humidity: Math.random() * 100,
      }),
    );

    notificationPayload.push({
      sensor_id: 'sensor_4',
      timestamp: new Date(),
      temperature: null,
      humidity: null,
    });

    for (const payload of notificationPayload) {
      this.client.emit('notifications', payload);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 10 seconds delay
    }
  }

  async insertData(data: SensorDataInput) {
    if (
      data.temperature === null ||
      data.humidity === null ||
      data.sensor_id === null ||
      data.timestamp === null
    ) {
      const createSuspiciousDataEvent = new CreateSuspiciousDataEvent();
      createSuspiciousDataEvent.exceptionType = 'suspicious_data';
      createSuspiciousDataEvent.type = 'suspicious';
      createSuspiciousDataEvent.body = data;

      this._eventEmitter.emit('action-log.create', createSuspiciousDataEvent);
    }

    const sensorHistory = this.iotSensorHistoryRepository.create({
      sensor_id: data.sensor_id,
      timestamp: data.timestamp,
      humidity: data.humidity,
      temperature: data.temperature,
    });

    this.iotSensorHistoryRepository.save(sensorHistory);
  }
}
