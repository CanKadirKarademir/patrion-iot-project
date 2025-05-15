import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Request } from 'express';
import * as pgErrors from '@drdgvhbh/postgres-error-codes';
import { isEmpty } from 'class-validator';
import { CreateTypeOrmFailureEvent, GenericResponse } from 'models';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Catch(TypeORMError)
export class TypeOrmErrorFilter implements ExceptionFilter {
  constructor(private _eventEmitter: EventEmitter2) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest<Request>();
    const message: string = (exception as TypeORMError).message;
    const code = (exception as any).code;
    const table: string = (exception as any).table;
    const detail: string = (exception as any).detail ?? '';
    const responseObject: GenericResponse<any> = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message + (table ? ' on ' + table : ''),
      errorCode: code,
    };

    switch (code) {
      case pgErrors.PG_UNIQUE_VIOLATION:
        // console.log('PG_UNIQUE_VIOLATION', pgErrors.PG_UNIQUE_VIOLATION, code);
        responseObject.statusCode = HttpStatus.CONFLICT;
        break;
      case pgErrors.PG_FOREIGN_KEY_VIOLATION:
        // console.log(
        //   'PG_FOREIGN_KEY_VIOLATION',
        //   pgErrors.PG_FOREIGN_KEY_VIOLATION,
        //   code,
        // );
        responseObject.statusCode = HttpStatus.CONFLICT;
        break;
      default:
        // console.log('default', code, message, table);

        responseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    const typeOrmFailure = new CreateTypeOrmFailureEvent();
    typeOrmFailure.url = request.url;
    typeOrmFailure.userId = request['user']?.userId
      ? request['user']?.userId
      : null;
    typeOrmFailure.type = 'failure';
    typeOrmFailure.body = request.body;
    typeOrmFailure.headers = request.headers;
    typeOrmFailure.method = request.method;
    typeOrmFailure.statusCode = responseObject.statusCode;
    typeOrmFailure.message = responseObject.message;
    typeOrmFailure.exceptionType = 'typeorm';
    typeOrmFailure.typeORMCode = code;
    typeOrmFailure.message = isEmpty(detail)
      ? responseObject.message
      : message + ', Detail : ' + detail;
    this._eventEmitter.emit('action-log.create', typeOrmFailure);

    response.status(responseObject.statusCode).json(responseObject);
  }
}
