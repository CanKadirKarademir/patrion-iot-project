import { Module } from '@nestjs/common';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';

@Module({
  controllers: [CompanyUserController],
  providers: [CompanyUserService]
})
export class CompanyUserModule {}
