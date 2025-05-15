import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyEntities } from './company.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([...companyEntities])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
