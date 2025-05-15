import { DateColumnsAbstract } from 'models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'iot_sensors',
})
export class IotSensorEntity extends DateColumnsAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true, name: 'sensor_id' })
  sensorId: string;
}
