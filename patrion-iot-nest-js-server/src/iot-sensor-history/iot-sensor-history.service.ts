import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CompanyIotSensorEntity,
  IotSensorEntity,
  IotSensorHistoryEntity,
} from 'database';
import {
  ListIotSensorHistoryInput,
  ListIotSensorHistoryPayload,
  RoleBasedQueryParameter,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class IotSensorHistoryService {
  constructor(
    @InjectRepository(IotSensorHistoryEntity)
    private readonly iotSensorHistoryRepository: Repository<IotSensorHistoryEntity>,
    @InjectRepository(CompanyIotSensorEntity)
    private readonly companyIotSensorRepository: Repository<CompanyIotSensorEntity>,
  ) {}

  async list(
    roleBasedQueryParam: RoleBasedQueryParameter,
    listInput: ListIotSensorHistoryInput,
  ): Promise<ListIotSensorHistoryPayload[] | any> {
    const where: { [key: string]: any } = {
      iotSensorId: listInput.sensorId,
    };

    if (roleBasedQueryParam.userId) {
      where.userId = roleBasedQueryParam.userId;
    }

    const companyIotSensor = await this.companyIotSensorRepository.findOne({
      where: where,
      relations: {
        iotSensor: true,
      },
    });

    if (!companyIotSensor) {
      throw new ForbiddenException('You do not have access to this sensor');
    }

    const iotSensorHistories = await this.iotSensorHistoryRepository.find({
      where: {
        sensor_id: companyIotSensor.iotSensor.sensorId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!iotSensorHistories)
      throw new BadRequestException('Sensor history not found');

    return iotSensorHistories.map((history) => {
      return {
        id: history.id,
        sensorId: history.sensor_id,
        timestamp: history.timestamp,
        temperature: history.temperature,
        humidity: history.humidity,
        createdAt: history.createdAt,
        updatedAt: history.updatedAt,
      };
    });
  }
}
