import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyIotSensorEntity, IotSensorHistoryEntity } from 'database';
import {
  ActionTypeEnum,
  CreateViewedLogEvent,
  ListIotSensorHistoryInput,
  ListIotSensorHistoryPayload,
  RoleBasedQueryParameter,
} from 'models';
import { InfluxDBService } from 'src/utils/services';
import { Repository } from 'typeorm';

@Injectable()
export class IotSensorHistoryService {
  constructor(
    @InjectRepository(IotSensorHistoryEntity)
    private readonly iotSensorHistoryRepository: Repository<IotSensorHistoryEntity>,
    @InjectRepository(CompanyIotSensorEntity)
    private readonly companyIotSensorRepository: Repository<CompanyIotSensorEntity>,
    private _eventEmitter: EventEmitter2,
    private influxDBService: InfluxDBService,
  ) {}

  async list(
    roleBasedQueryParam: RoleBasedQueryParameter,
    listInput: ListIotSensorHistoryInput,
    userId: string,
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

    //PostgreSQL Kaydı
    // const iotSensorHistories = await this.iotSensorHistoryRepository.find({
    //   where: {
    //     sensor_id: companyIotSensor.iotSensor.sensorId,
    //   },
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });

    // if (!iotSensorHistories)
    //   throw new BadRequestException('Sensor history not found');

    //InfluxDB Kaydı
    const results = await this.influxDBService.readSensorData(
      companyIotSensor.iotSensor.sensorId,
    );

    const createViewedLogEvent = new CreateViewedLogEvent();
    createViewedLogEvent.actionType = ActionTypeEnum.viewedLog;
    createViewedLogEvent.type = 'success';
    createViewedLogEvent.userId = userId;
    this._eventEmitter.emit('action-log.create', createViewedLogEvent);

    return results;
  }
}
