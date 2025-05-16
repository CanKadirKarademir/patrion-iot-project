import { RoleBasedQueryParameter, TokenPayload, UserRoleEnum } from 'models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreateRoleBasedQueryParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = request.user;
    const roleBasedQueryParamteres: RoleBasedQueryParameter =
      {} as RoleBasedQueryParameter;

    if (token.role === UserRoleEnum.CompanyAdmin) {
      roleBasedQueryParamteres.companyId = token.companyId;
    }

    if (token.role === UserRoleEnum.User) {
      roleBasedQueryParamteres.companyId = token.companyId;
      roleBasedQueryParamteres.userId = token.userId;
    }

    return roleBasedQueryParamteres;
  },
);
