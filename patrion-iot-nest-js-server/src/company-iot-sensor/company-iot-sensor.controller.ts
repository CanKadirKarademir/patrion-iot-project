import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiGenericHeader, ApiGenericResponse, JwtAuthGuard } from 'src/utils';
import { CompanyIotSensorService } from './company-iot-sensor.service';
import {
  CreateCompanyIotSensorInput,
  CreateCompanyIotSensorPayload,
  ListAllCompanyIotSensorInput,
  ListAllCompanyIotSensorPayload,
} from 'models';

@ApiGenericHeader('Company Iot Sensor')
@UseGuards(JwtAuthGuard)
@Controller('company-iot-sensor')
export class CompanyIotSensorController {
  constructor(
    private readonly _companyIotSensorService: CompanyIotSensorService,
  ) {}

  @ApiGenericResponse(
    ListAllCompanyIotSensorPayload,
    'LIST',
    'COMPANY IOT SENSOR',
  )
  @Get('list')
  async listAll(
    @Query() listInput: ListAllCompanyIotSensorInput,
  ): Promise<ListAllCompanyIotSensorPayload[]> {
    return await this._companyIotSensorService.listAll(listInput);
  }

  @ApiGenericResponse(
    CreateCompanyIotSensorPayload,
    'CREATE',
    'COMPANY IOT SENSOR',
  )
  @Post('create')
  async createCompanyIotSensor(
    @Body() createInput: CreateCompanyIotSensorInput,
  ): Promise<CreateCompanyIotSensorPayload> {
    return await this._companyIotSensorService.create(createInput);
  }
}
