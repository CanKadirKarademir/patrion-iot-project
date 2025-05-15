import { CreateSuccessEvent } from './create-success.action-log.event';

export class CreateHttpFailureEvent extends CreateSuccessEvent {
  exceptionType?: string;
}
