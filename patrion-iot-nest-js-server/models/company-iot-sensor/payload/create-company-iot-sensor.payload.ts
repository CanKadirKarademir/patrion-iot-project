import { IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { CreateCompanyIotSensorInput } from '../input';

export class CreateCompanyIotSensorPayload extends IntersectionType(
  IdAbstract,
  CreateCompanyIotSensorInput,
) {}
