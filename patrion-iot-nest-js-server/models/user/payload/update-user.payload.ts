import { PartialType } from '@nestjs/swagger';
import { CreateUserPayload } from '.';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {}
