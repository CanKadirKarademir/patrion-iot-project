import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiGenericHeader,
  ApiGenericResponse,
  CreateRoleBasedQueryParam,
  RolesGuard,
  TokenPayloadDecorator,
  UserRoles,
} from 'src/utils';
import { JwtAuthGuard } from 'src/utils';
import {
  CreateUserInput,
  CreateUserPayload,
  DeleteUserPayload,
  ListAllUserPayload,
  RoleBasedQueryParameter,
  TokenPayload,
  UpdateUserInput,
  UpdateUserPayload,
  UserRoleEnum,
} from 'models';

@ApiGenericHeader('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@UserRoles(UserRoleEnum.SystemAdmin, UserRoleEnum.CompanyAdmin)
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiGenericResponse(ListAllUserPayload, 'LIST', 'USER')
  @Get('list')
  async listAllUsers(
    @CreateRoleBasedQueryParam('data')
    roleBasedQueryParam: RoleBasedQueryParameter,
    @TokenPayloadDecorator() tokenPayload: TokenPayload,
  ): Promise<ListAllUserPayload[]> {
    return this._userService.listAllUsers(roleBasedQueryParam);
  }

  @ApiGenericResponse(CreateUserPayload, 'CREATE', 'USER')
  @Post('create')
  async createUser(
    @Body() createInput: CreateUserInput,
    // @TokenPayloadDecorator() tokenPayload: TokenPayload,
  ): Promise<CreateUserPayload> {
    return this._userService.createUpdate(createInput);
  }

  @ApiGenericResponse(UpdateUserPayload, 'UPDATE', 'USER')
  @Put('update')
  async updateUser(
    @Body() updateInput: UpdateUserInput,
    // @TokenPayloadDecorator() tokenPayload: TokenPayload,
  ): Promise<UpdateUserPayload> {
    return await this._userService.updateUser(updateInput);
  }

  @ApiGenericResponse(DeleteUserPayload, 'DELETE', 'USER')
  @Delete('delete')
  async deleteUser(
    @Query('id') id: string,
    // @TokenPayloadDecorator() tokenPayload: TokenPayload,
  ): Promise<UpdateUserPayload> {
    return await this._userService.delete(id);
  }
}
