import { PartialType, PickType } from '@nestjs/swagger';
import { CreateCompanyIotSensorInput } from '.';

export class ListAllCompanyIotSensorInput extends PartialType(
  PickType(CreateCompanyIotSensorInput, ['companyId', 'userId']),
) {}
