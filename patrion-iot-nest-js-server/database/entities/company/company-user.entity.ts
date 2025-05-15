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

@Entity({
  name: 'company_users',
})
export class CompanyUserEntity extends DateColumnsAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_user_user_id',
  })
  user: UserEntity;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @ManyToOne(() => CompanyEntity, (company) => company)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_user_company_id',
  })
  company: CompanyEntity;

  @Column({ nullable: false, name: 'company_id' })
  companyId: string;
}
