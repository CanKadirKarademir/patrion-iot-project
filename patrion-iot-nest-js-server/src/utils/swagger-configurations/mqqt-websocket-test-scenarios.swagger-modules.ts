import { AuthModule } from 'src/auth/auth.module';
import { CompanyIotSensorModule } from 'src/company-iot-sensor/company-iot-sensor.module';
import { IotSensorHistoryModule } from 'src/iot-sensor-history/iot-sensor-history.module';
import { MqttModule } from 'src/mqtt/mqtt.module';

export const mqttWebsocketTestScenarioSwaggerModules = [
  AuthModule,
  MqttModule,
  CompanyIotSensorModule,
  IotSensorHistoryModule,
];
