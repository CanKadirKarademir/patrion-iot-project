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
import { ApiGenericHeader, ApiGenericResponse, JwtAuthGuard } from 'src/utils';
import { CompanyService } from './company.service';
import {
  CreateCompanyInput,
  CreateCompanyPayload,
  DeleteComnpanyPayload,
  ListAllCompanyPayload,
  UpdateCompanyInput,
  UpdateCompanyPayload,
} from 'models';

@ApiGenericHeader('Company')
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @ApiGenericResponse(ListAllCompanyPayload, 'LIST', 'COMPANY')
  @Get('list')
  async listAll(): Promise<ListAllCompanyPayload[]> {
    return await this._companyService.listAll();
  }

  @ApiGenericResponse(CreateCompanyPayload, 'CREATE', 'COMPANY')
  @Post('create')
  async createCompany(
    @Body() createInput: CreateCompanyInput,
  ): Promise<CreateCompanyPayload> {
    return await this._companyService.createCompany(createInput);
  }

  @ApiGenericResponse(UpdateCompanyPayload, 'UPDATE', 'COMPANY')
  @Put('update')
  async updateCompany(
    @Body() updateInput: UpdateCompanyInput,
  ): Promise<UpdateCompanyPayload> {
    return await this._companyService.updateCompany(updateInput);
  }

  @ApiGenericResponse(DeleteComnpanyPayload, 'DELETE', 'COMPANY')
  @Delete('delete')
  async deleteCompany(@Query('id') id: string): Promise<DeleteComnpanyPayload> {
    return await this._companyService.delete(id);
  }
}
