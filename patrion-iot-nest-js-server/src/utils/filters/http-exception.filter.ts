import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request, Response } from 'express';
import { CreateHttpFailureEvent, GenericResponse } from 'models';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private _eventEmitter: EventEmitter2) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseObject: GenericResponse<any> = {
      statusCode: status,
      message: exception.message,
    };
    const uri = request.url.split('/')[1].toUpperCase();

    if (uri !== 'AUTH') {
      const httpFailureEvent = new CreateHttpFailureEvent();
      httpFailureEvent.url = request.url;
      httpFailureEvent.userId = request['user']?.userId
        ? request['user']?.userId
        : null;
      httpFailureEvent.type = 'failure';
      httpFailureEvent.body = request.body;
      httpFailureEvent.exceptionType = 'http';
      httpFailureEvent.headers = request.headers;
      httpFailureEvent.method = request.method;
      httpFailureEvent.statusCode = status;
      httpFailureEvent.message = responseObject.message;

      this._eventEmitter.emit('action-log.create', httpFailureEvent);
    }
    response.status(responseObject.statusCode).json(responseObject);
  }
}
