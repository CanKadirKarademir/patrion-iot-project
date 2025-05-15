import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IotSensorService } from './iot-tsensor.service';
import { ApiGenericHeader, ApiGenericResponse, JwtAuthGuard } from 'src/utils';
import {
  CreateIotSensorInput,
  CreateIotSensorPayload,
  ListAllIotSensorPayload,
} from 'models';

@ApiGenericHeader('Iot Sensor')
@UseGuards(JwtAuthGuard)
@Controller('iot-tsensor')
export class IotSensorController {
  constructor(private iotSensorService: IotSensorService) {}

  @ApiGenericResponse(ListAllIotSensorPayload, 'LIST', 'IOT SENSOR')
  @Get('list')
  async getAllIotSensors(): Promise<ListAllIotSensorPayload[]> {
    return this.iotSensorService.findAll();
  }

  @ApiGenericResponse(CreateIotSensorPayload, 'CREATE', 'IOT SENSOR')
  @Post('create')
  async createIotSensor(
    @Body() createIotInput: CreateIotSensorInput,
  ): Promise<CreateIotSensorPayload> {
    return this.iotSensorService.create(createIotInput);
  }
}
