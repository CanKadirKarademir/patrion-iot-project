import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IotSensorHistoryService } from './iot-sensor-history.service';
import {
  ApiGenericHeader,
  ApiGenericResponse,
  CreateRoleBasedQueryParam,
  JwtAuthGuard,
  RolesGuard,
  UserRoles,
} from 'src/utils';
import {
  ListIotSensorHistoryInput,
  ListIotSensorHistoryPayload,
  RoleBasedQueryParameter,
  UserRoleEnum,
} from 'models';

@ApiGenericHeader('Iot Sensor History')
@UseGuards(JwtAuthGuard, RolesGuard)
@UserRoles(
  UserRoleEnum.SystemAdmin,
  UserRoleEnum.CompanyAdmin,
  UserRoleEnum.User,
)
@Controller('iot-sensor-history')
export class IotSensorHistoryController {
  constructor(
    private readonly iotSensorHistoryService: IotSensorHistoryService,
  ) {}

  @ApiGenericResponse(ListIotSensorHistoryPayload, 'LIST', 'IOT SENSOR HISTORY')
  @Get('list')
  async list(
    @Query() listInput: ListIotSensorHistoryInput,
    @CreateRoleBasedQueryParam('data')
    roleBasedQueryParam: RoleBasedQueryParameter,
  ): Promise<ListIotSensorHistoryPayload[]> {
    return await this.iotSensorHistoryService.list(
      roleBasedQueryParam,
      listInput,
    );
  }
}
