import { IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { ListIotSensorHistoryInput } from '../input';
import { SensorDataInput } from 'models/mqtt';

export class ListIotSensorHistoryPayload extends IntersectionType(
  IdAbstract,
  ListIotSensorHistoryInput,
  SensorDataInput,
) {}
