import { Injectable } from '@nestjs/common';
import { CreateEntryInput } from 'models';
import { InfluxDBService } from 'src/utils/services';

@Injectable()
export class InfluxService {
  constructor(private readonly influxDBService: InfluxDBService) {}

  async getData() {
    try {
      const data = await this.influxDBService.getData('sensor_123');
      return data;
    } catch (error) {
      console.error('Error fetching data from InfluxDB:', error);
      throw error;
    }
  }

  async writeDataWithPoint(createPoint: CreateEntryInput): Promise<void> {
    try {
      await this.influxDBService.writeDataWithPoint(createPoint);
    } catch (error) {
      console.error('Error writing data with point to InfluxDB:', error);
      throw error;
    }
  }
}
