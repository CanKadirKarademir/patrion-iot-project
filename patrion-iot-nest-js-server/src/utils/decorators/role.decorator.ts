import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'models';

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: UserRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
