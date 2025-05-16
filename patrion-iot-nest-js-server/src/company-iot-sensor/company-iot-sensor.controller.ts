import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiGenericHeader,
  ApiGenericResponse,
  JwtAuthGuard,
  RolesGuard,
  UserRoles,
} from 'src/utils';
import { CompanyIotSensorService } from './company-iot-sensor.service';
import {
  CreateCompanyIotSensorInput,
  CreateCompanyIotSensorPayload,
  ListAllCompanyIotSensorInput,
  ListAllCompanyIotSensorPayload,
  UserRoleEnum,
} from 'models';
import { ApiOperation } from '@nestjs/swagger';

@ApiGenericHeader('Company Iot Sensor')
@UseGuards(JwtAuthGuard, RolesGuard)
@UserRoles(
  UserRoleEnum.SystemAdmin,
  UserRoleEnum.CompanyAdmin,
  UserRoleEnum.User,
)
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
  @ApiOperation({
    summary:
      'List all company IoT sensors for a specific company, user, and IoT sensor',
  })
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
