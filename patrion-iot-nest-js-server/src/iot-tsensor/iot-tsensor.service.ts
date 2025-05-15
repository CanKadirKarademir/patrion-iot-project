import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IotSensorEntity } from 'database';
import {
  CreateIotSensorInput,
  CreateIotSensorPayload,
  DeleteIotSensorPayload,
  ListAllIotSensorPayload,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class IotSensorService {
  constructor(
    @InjectRepository(IotSensorEntity)
    private readonly iotSensorRepository: Repository<IotSensorEntity>,
  ) {}

  async findAll(): Promise<ListAllIotSensorPayload[]> {
    return this.iotSensorRepository.find();
  }

  async create(
    createInput: CreateIotSensorInput,
  ): Promise<CreateIotSensorPayload> {
    const findIotSensor = await this.iotSensorRepository.findOne({
      where: {
        sensorId: createInput.sensorId,
      },
    });
    if (findIotSensor) {
      throw new ConflictException('Sensor ID already exists');
    }

    const createdIotSensor = this.iotSensorRepository.create(createInput);

    const savedIotSensor = await this.iotSensorRepository.save(
      createdIotSensor,
    );

    if (!savedIotSensor) {
      throw new BadRequestException('Failed to create IoT sensor');
    }
    return savedIotSensor;
  }

  async delete(id: string): Promise<DeleteIotSensorPayload> {
    const findIotSensor = await this.iotSensorRepository.findOne({
      where: {
        id,
      },
    });
    if (!findIotSensor) {
      throw new BadRequestException('Sensor ID not found');
    }

    const deletedIotSensor = await this.iotSensorRepository.softDelete({
      id: id,
    });

    if (!deletedIotSensor) {
      throw new BadRequestException('Failed to delete IoT sensor');
    }
    return { id: id };
  }
}
