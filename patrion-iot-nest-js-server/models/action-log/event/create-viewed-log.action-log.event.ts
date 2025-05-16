import { ActionTypeEnum } from 'models/enums';
import { CreateSuccessEvent } from './create-success.action-log.event';

export class CreateViewedLogEvent extends CreateSuccessEvent {
  exceptionType?: string;
  actionType: ActionTypeEnum;
}
