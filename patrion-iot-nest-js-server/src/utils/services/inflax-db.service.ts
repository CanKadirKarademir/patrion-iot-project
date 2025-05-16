import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { CreateEntryInput } from 'models';

export class InfluxDBService {
  private client: InfluxDB;
  private org = 'patrion-iot';
  private bucket = 'patrion-iot';
  constructor() {
    const token = process.env.INFLUXDB_TOKEN;
    const url = process.env.INFLUXDB_URL;

    this.client = new InfluxDB({ url, token });
  }

  async writeDataWithPoint(data: CreateEntryInput): Promise<void> {
    const writeClient = this.client.getWriteApi(this.org, this.bucket, 'ns');

    const point = new Point('measurement1')
      .tag('sensor_id', data.sensor_id)
      .floatField('temperature', data.temperature)
      .floatField('humidity', data.humidity)
      .timestamp(new Date(data.timestamp * 1000));

    writeClient.writePoint(point);
    await writeClient.close();
  }

  async getData(sensorId: string): Promise<any[]> {
    const queryApi = this.client.getQueryApi(this.org);
    const fluxQuery = `
      from(bucket: "${this.bucket}")
        |> range(start: -30d)
        |> filter(fn: (r) => r._measurement == "measurement1")
        |> filter(fn: (r) => r.sensor_id == "${sensorId}")
        |> sort(columns: ["_time"], desc: true)
    `;

    const results: any[] = [];
    return new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          results.push(o);
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }
}
