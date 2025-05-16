import { DateColumnsAbstract } from 'models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'iot_sensor_histories',
})
export class IotSensorHistoryEntity extends DateColumnsAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'sensor_id' })
  sensor_id: string;

  @Column({ type: 'timestamptz', nullable: true, name: 'timestamp' })
  timestamp: Date;

  @Column({ nullable: true, name: 'humidity' })
  humidity: number;

  @Column({ nullable: true, name: 'temperature' })
  temperature: number;
}
