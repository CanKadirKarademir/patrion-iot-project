import { AuthModule } from 'src/auth/auth.module';
import { CompanyIotSensorModule } from 'src/company-iot-sensor/company-iot-sensor.module';
import { CompanyModule } from 'src/company/company.module';
import { IotSensorModule } from 'src/iot-tsensor/iot-tsensor.module';
import { UserModule } from 'src/user/user.module';

export const userAuthorisationsTestScenarioSwaggerModules = [
  AuthModule,
  UserModule,
  CompanyModule,
  IotSensorModule,
  CompanyIotSensorModule,
];
