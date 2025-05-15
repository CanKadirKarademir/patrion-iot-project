import { Module } from '@nestjs/common';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { companyUserEntities } from './company-user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([...companyUserEntities])],
  controllers: [CompanyUserController],
  providers: [CompanyUserService],
})
export class CompanyUserModule {}
