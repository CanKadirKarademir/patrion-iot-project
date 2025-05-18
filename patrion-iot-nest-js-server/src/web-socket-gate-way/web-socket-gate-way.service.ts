import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IotSensorHistoryEntity } from 'database';
import { GetSensorData } from 'models';
import { MqttClient, connect } from 'mqtt';
import { Server } from 'socket.io';
import { Repository } from 'typeorm';

@WebSocketGateway({
  //   cors: {
  //     origin: ['http://localhost:3000'],
  //   },
})
export class WebSocketGateWayService implements OnModuleInit {
  public readonly mqtt: MqttClient;
  constructor(
    @InjectRepository(IotSensorHistoryEntity)
    private iotSensorHistoryRepository: Repository<IotSensorHistoryEntity>,
    private configService: ConfigService,
  ) {
    this.mqtt = connect(this.configService.get('MQTT_URL'), {
      clientId: null,
      clean: true,
      username: 'user1',
      password: '1234',
    });
  }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
    this.mqtt.on('connect', () => {
      console.log('Connected to MQTT server');
    });
  }

  @SubscribeMessage('getSensorDataFromDb')
  async getSensorDataFromDb(@MessageBody() body: GetSensorData) {
    const iotSensorHistory = await this.iotSensorHistoryRepository.find({
      where: {
        sensor_id: body.sensorId,
      },
    });
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'Mesaj ulaştı',
      content: iotSensorHistory,
    });
  }
}
