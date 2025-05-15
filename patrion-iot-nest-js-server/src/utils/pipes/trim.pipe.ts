import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;
    if (type === 'custom') {
      return values;
    }
    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }

    if (this.isObj(values) && type === 'query') {
      return this.trim(values);
    }

    if (!this.isObj(values) && type === 'query') {
      if (data !== undefined) return values.trim();
    }

    //if you ever decide to use params you need to add it here like the others example: params

    throw new HttpException(
      {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        message: 'Invalid Requestxx',
      },
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
