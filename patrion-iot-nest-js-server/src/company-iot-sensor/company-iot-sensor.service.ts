import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyIotSensorEntity } from 'database';
import {
  CreateCompanyIotSensorInput,
  CreateCompanyIotSensorPayload,
  ListAllCompanyIotSensorInput,
  ListAllCompanyIotSensorPayload,
  RoleBasedQueryParameter,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyIotSensorService {
  constructor(
    @InjectRepository(CompanyIotSensorEntity)
    private readonly _companyIotSensorRepository: Repository<CompanyIotSensorEntity>,
  ) {}

  async listAll(
    roleBasedQueryParam: RoleBasedQueryParameter,
    listInput: ListAllCompanyIotSensorInput,
  ): Promise<ListAllCompanyIotSensorPayload[]> {
    const companyIotSensors = await this._companyIotSensorRepository.find({
      where: {
        companyId: roleBasedQueryParam.companyId
          ? roleBasedQueryParam.companyId
          : listInput.companyId,
        userId: roleBasedQueryParam.userId ? roleBasedQueryParam.userId : null,
      },
      relations: {
        iotSensor: true,
        company: true,
        user: true,
      },
      select: {
        id: true,
        companyId: true,
        iotSensorId: true,
        userId: true,
        company: {
          name: true,
        },
        iotSensor: {
          sensorId: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });

    if (!companyIotSensors) {
      throw new BadRequestException('Failed to list Company IoT Sensors');
    }

    return companyIotSensors.map((companyIotSensor) => ({
      id: companyIotSensor.id,
      companyId: companyIotSensor.companyId,
      iotSensorId: companyIotSensor.iotSensorId,
      userId: companyIotSensor.userId,
      companyName: companyIotSensor.company.name,
      sensorId: companyIotSensor.iotSensor.sensorId,
      firstName: companyIotSensor.user.firstName,
      lastName: companyIotSensor.user.lastName,
      email: companyIotSensor.user.email,
      role: companyIotSensor.user.role,
    }));
  }

  async create(
    createInput: CreateCompanyIotSensorInput,
  ): Promise<CreateCompanyIotSensorPayload> {
    const companyIotSensor =
      this._companyIotSensorRepository.create(createInput);

    const savedCompanyIotSensor = await this._companyIotSensorRepository.save(
      companyIotSensor,
    );

    if (!savedCompanyIotSensor) {
      throw new BadRequestException('Failed to create Company IoT Sensor');
    }

    return savedCompanyIotSensor;
  }
}
