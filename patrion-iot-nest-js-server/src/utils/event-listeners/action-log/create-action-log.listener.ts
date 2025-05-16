import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionLogEntity } from 'database';
import {
  CreateHttpFailureEvent,
  CreateSuccessEvent,
  CreateSuspiciousDataEvent,
  CreateTypeOrmFailureEvent,
  CreateViewedLogEvent,
} from 'models';
import { Repository } from 'typeorm';

@Injectable()
export class CreateActionLogListener {
  constructor(
    @InjectRepository(ActionLogEntity)
    private _actionLogRepository: Repository<ActionLogEntity>,
  ) {}

  @OnEvent('action-log.create')
  handleActionCreateEvent(
    actionLog:
      | CreateSuccessEvent
      | CreateHttpFailureEvent
      | CreateTypeOrmFailureEvent
      | CreateSuspiciousDataEvent
      | CreateViewedLogEvent,
  ) {
    const actionLogEntity = this._actionLogRepository.create(actionLog);
    this._actionLogRepository.save(actionLogEntity);
  }
}
