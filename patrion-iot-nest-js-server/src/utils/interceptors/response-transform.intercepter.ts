import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GenericResponse } from 'models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, GenericResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GenericResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    //Check new developments methods in the console
    //console.log('Request...', request.url, request.method, request.body);

    const message =
      request.url.split('/')[1].toUpperCase() +
      ' ' +
      request.url.split('/')[2].split('?')[0].toUpperCase() +
      ' ' +
      'SUCCESSFULLY';

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        message: message,
        response: data,
      })),
    );
  }
}
