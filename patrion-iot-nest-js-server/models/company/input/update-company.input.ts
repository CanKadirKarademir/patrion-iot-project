import { PartialType } from '@nestjs/swagger';
import { CreateCompanyPayload } from '../payload';

export class UpdateCompanyInput extends PartialType(CreateCompanyPayload) {}
