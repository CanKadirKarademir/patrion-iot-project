import { PartialType } from '@nestjs/swagger';
import { CreateCompanyIotSensorInput } from '.';

export class ListAllCompanyIotSensorInput extends PartialType(
  CreateCompanyIotSensorInput,
) {}
