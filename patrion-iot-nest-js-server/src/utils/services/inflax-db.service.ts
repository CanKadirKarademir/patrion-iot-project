import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { SensorDataInput } from 'models';

export class InfluxDBService {
  private client: InfluxDB;
  private org = 'patrion-iot';
  private bucket = 'patrion-iot';
  constructor() {
    const token = process.env.INFLUXDB_TOKEN;
    const url = process.env.INFLUXDB_URL;

    this.client = new InfluxDB({ url, token });
  }

  async writeSensorData(createInput: SensorDataInput) {
    const writeApi = this.client.getWriteApi(this.bucket, this.org);
    const point = new Point('sensor_data')
      .tag('sensor_id', createInput.sensor_id)
      .floatField('temperature', createInput.temperature)
      .floatField('humidity', createInput.humidity)
      .timestamp(new Date(createInput.timestamp));

    writeApi.writePoint(point);
    try {
      await writeApi.flush();
      console.log("Veri InfluxDB'ye yazıldı:", createInput);
    } catch (error) {
      console.error('Veri yazma hatası:', error);
    } finally {
      await writeApi.close();
    }
  }

  async readSensorData(sensorId, start = '-2d', stop = 'now()') {
    const queryApi = this.client.getQueryApi(this.org);
    let fluxQuery = `
    from(bucket: "${this.bucket}")
    |> range(start: ${start}, stop: ${stop})
    |> filter(fn: (r) => r._measurement == "sensor_data")
  `;

    if (sensorId) {
      fluxQuery += `|> filter(fn: (r) => r.sensor_id == "${sensorId}")`;
    }
    fluxQuery += `|> yield(name: "mean")`;
    try {
      const results = await queryApi.collectRows(fluxQuery);

      return results;
    } catch (error) {
      return [];
    }
  }
}
