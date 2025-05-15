import { IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { CreateCompanyInput } from '../input';

export class CreateCompanyPayload extends IntersectionType(
  IdAbstract,
  CreateCompanyInput,
) {}
