import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyIotSensorEntity } from 'database';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyIotSensorService {
  constructor(
    @InjectRepository(CompanyIotSensorEntity)
    private readonly _companyIotSensorRepository: Repository<CompanyIotSensorEntity>,
  ) {}
}
