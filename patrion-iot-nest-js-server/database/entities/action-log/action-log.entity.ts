import { ActionTypeEnum } from 'models';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'action_logs',
})
export class ActionLogEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, name: 'user_id' })
  userId: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  url?: string;

  @Column({
    type: 'enum',
    enum: ['success', 'failure', 'suspicious'],
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['typeorm', 'http', 'suspicious_data'],
    nullable: true,
    name: 'exception_type',
  })
  exceptionType?: string;

  @Column({ type: 'json', nullable: true })
  body?: any;

  @Column({ type: 'json', nullable: true })
  headers?: any;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true, name: 'status_code' })
  statusCode?: number;

  @Column({ nullable: true, name: 'typeorm_code' })
  typeORMCode?: string;

  @Column({ nullable: true })
  message?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ActionTypeEnum,
    default: ActionTypeEnum.default,
    name: 'action_type',
  })
  actionType: ActionTypeEnum;
}
