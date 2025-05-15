import { IntersectionType } from '@nestjs/swagger';
import { CreateCompanyUserInput } from '../input';
import { IdAbstract } from 'models/abstracts';

export class CreateCompanyUserPayload extends IntersectionType(
  IdAbstract,
  CreateCompanyUserInput,
) {}
