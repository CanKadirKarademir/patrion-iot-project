import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DateColumnsAbstract, UserRoleEnum } from 'models';
import { CompanyUserEntity } from '../company';

@Entity({
  name: 'users',
})
export class UserEntity extends DateColumnsAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ unique: true, nullable: true, name: 'email' })
  email: string;

  @Column({ type: 'text', nullable: true, name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.User,
    name: 'role',
  })
  role: UserRoleEnum;

  @OneToMany(() => CompanyUserEntity, (companyUser) => companyUser.user)
  companyUsers: CompanyUserEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      this.password = 'defaultPassword';
    }

    if (this.password && this.password.length > 0) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
