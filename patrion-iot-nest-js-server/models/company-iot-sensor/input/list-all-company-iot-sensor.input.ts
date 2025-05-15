import { PartialType } from '@nestjs/swagger';
import { CreateCompanyIotSensorInput } from '.';

export class ListAllIotSensorInput extends PartialType(
  CreateCompanyIotSensorInput,
) {}
