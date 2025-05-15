import { CreateHttpFailureEvent } from './create-http-failure.action-log.event';

export class CreateTypeOrmFailureEvent extends CreateHttpFailureEvent {
  typeORMCode?: string;
}
