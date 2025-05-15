import { IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { CreateUserInput } from '../input';

export class CreateUserPayload extends IntersectionType(
  IdAbstract,
  CreateUserInput,
) {}
