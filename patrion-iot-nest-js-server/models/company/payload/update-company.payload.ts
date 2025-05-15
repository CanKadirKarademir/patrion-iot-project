import { PartialType } from '@nestjs/swagger';
import { CreateCompanyPayload } from '.';

export class UpdateCompanyPayload extends PartialType(CreateCompanyPayload) {}
