import {
  ActionLogEntity,
  CompanyEntity,
  CompanyUserEntity,
  UserEntity,
} from 'database';
import { IotSensorEntity } from 'database/entities/iot-sensor';

export const entities = [
  ActionLogEntity,
  UserEntity,
  CompanyEntity,
  CompanyUserEntity,
  IotSensorEntity,
];
