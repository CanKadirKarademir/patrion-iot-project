import { Body, Controller, Get, Post } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEntryInput } from 'models';

@ApiTags('InfluxDB')
@Controller('influx')
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @Get('read')
  async readData() {
    return await this.influxService.getData();
  }

  @Post('write')
  async writeData(@Body() createPoint: CreateEntryInput) {
    return this.influxService.writeDataWithPoint(createPoint);
  }
}
