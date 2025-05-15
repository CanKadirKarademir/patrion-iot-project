import { DateColumnsAbstract } from 'models';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user';
import { CompanyEntity } from './company.entity';
import { IotSensorEntity } from '../iot-sensor';

@Entity({
  name: 'company_iot_sensors',
})
export class CompanyIotSensorEntity extends DateColumnsAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_iot_sensors_user_id',
  })
  user: UserEntity;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @ManyToOne(() => CompanyEntity, (company) => company)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_iot_sensors_company_id',
  })
  company: CompanyEntity;

  @Column({ nullable: false, name: 'company_id' })
  companyId: string;

  @ManyToOne(() => IotSensorEntity, (company) => company)
  @JoinColumn({
    name: 'iot_sensor_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_iot_sensors_iot_sensor_id',
  })
  iotSensor: IotSensorEntity;

  @Column({ nullable: false, name: 'iot_sensor_id' })
  iotSensorId: string;
}
