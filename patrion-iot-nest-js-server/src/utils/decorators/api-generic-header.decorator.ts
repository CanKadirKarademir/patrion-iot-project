import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const ApiGenericHeader = (name: string) => {
  return applyDecorators(ApiTags(name), ApiBearerAuth());
};
