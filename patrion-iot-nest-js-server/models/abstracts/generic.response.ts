import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export abstract class GenericResponse<T> {
  @ApiProperty({
    enum: HttpStatus,
    example: HttpStatus.CREATED,
  })
  statusCode: HttpStatus;

  @ApiProperty()
  message: string;

  @ApiHideProperty()
  errorCode?: number | string;

  @ApiHideProperty()
  payload?: T;
}
