import { Controller, UseGuards } from '@nestjs/common';
import { ApiGenericHeader, JwtAuthGuard } from 'src/utils';

@ApiGenericHeader('Company Iot Sensor')
@UseGuards(JwtAuthGuard)
@Controller('company-iot-sensor')
export class CompanyIotSensorController {}
