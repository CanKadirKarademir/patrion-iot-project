import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyUserService } from './company-user.service';
import {
  ApiGenericHeader,
  ApiGenericResponse,
  JwtAuthGuard,
  RolesGuard,
  UserRoles,
} from 'src/utils';
import {
  CreateCompanyUserInput,
  CreateCompanyUserPayload,
  DeleteCompanyUserPayload,
  ListAllCompanyUserInput,
  ListAllCompanyUserPayload,
  UserRoleEnum,
} from 'models';

@UseGuards(JwtAuthGuard, RolesGuard)
@UserRoles(UserRoleEnum.SystemAdmin, UserRoleEnum.CompanyAdmin)
@ApiGenericHeader('CompanyUser')
@Controller('company-user')
export class CompanyUserController {
  constructor(private readonly _companyUserService: CompanyUserService) {}

  @ApiGenericResponse(ListAllCompanyUserPayload, 'LIST', 'COMPANY USER')
  @Get('list')
  async listAll(
    @Query() listInput: ListAllCompanyUserInput,
  ): Promise<ListAllCompanyUserPayload[]> {
    return await this._companyUserService.findAll(listInput);
  }

  @ApiGenericResponse(CreateCompanyUserPayload, 'CREATE', 'COMPANY USER')
  @Post('create')
  async createCompanyUser(
    @Body() createInput: CreateCompanyUserInput,
  ): Promise<CreateCompanyUserPayload> {
    return await this._companyUserService.createCompanyUser(createInput);
  }

  @ApiGenericResponse(DeleteCompanyUserPayload, 'DELETE', 'COMPANY USER')
  @Delete('delete')
  async deleteCompanyUser(
    @Query('id') id: string,
  ): Promise<DeleteCompanyUserPayload> {
    return await this._companyUserService.delete(id);
  }
}
