import { IsOptional } from 'class-validator';
import { IsNull } from 'typeorm';

export class RoleBasedQueryParameter {
  @IsOptional()
  companyId?: string | undefined | null;
  @IsOptional()
  userId?: string | undefined | null;
}
