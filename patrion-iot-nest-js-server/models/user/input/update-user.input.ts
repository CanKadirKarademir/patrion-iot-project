import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserPayload } from '../payload';

export class UpdateUserInput extends PartialType(
  PickType(CreateUserPayload, ['id', 'firstName', 'lastName']),
) {}
