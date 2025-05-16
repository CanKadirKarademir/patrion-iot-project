import { entities } from './typeorm/entities';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  HttpExceptionFilter,
  TrimPipe,
  TypeOrmErrorFilter,
  ValidationPipe,
} from './utils';
import { ActionLogEntity } from 'database';
import { eventListeners } from './utils/event-listeners';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MqttModule } from './mqtt/mqtt.module';
import { InfluxModule } from './influx/influx.module';
import { CompanyModule } from './company/company.module';
import { CompanyUserModule } from './company-user/company-user.module';
import { IotSensorModule } from './iot-tsensor/iot-tsensor.module';
import { CompanyIotSensorModule } from './company-iot-sensor/company-iot-sensor.module';
import { IotSensorHistoryModule } from './iot-sensor-history/iot-sensor-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_DATABASE_TYPE as any,
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' ? true : false,
      logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
      entities: [...entities],
    }),
    AuthModule,
    UserModule,
    // For filters to work, the entities must be imported here as for feature
    TypeOrmModule.forFeature([ActionLogEntity]),
    EventEmitterModule.forRoot(),
    MqttModule,
    InfluxModule,
    CompanyModule,
    CompanyUserModule,
    IotSensorModule,
    CompanyIotSensorModule,
    IotSensorHistoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeOrmErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: TrimPipe,
    },

    ...eventListeners,
  ],
  exports: [AuthModule],
})
export class AppModule {}
