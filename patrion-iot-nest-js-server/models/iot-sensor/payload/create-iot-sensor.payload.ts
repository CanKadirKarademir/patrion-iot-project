import { IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { CreateIotSensorInput } from '../input';

export class CreateIotSensorPayload extends IntersectionType(
  IdAbstract,
  CreateIotSensorInput,
) {}
