import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export abstract class Pagintation {
  @ApiProperty({
    type: String,
    example: 1,
  })
  @IsString()
  page: string;
  @ApiProperty({
    type: String,
    example: 10,
  })
  @IsString()
  limit: string;

  @ApiProperty({
    type: String,
    example: 'keyword',
    required: false,
  })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiHideProperty()
  @IsOptional()
  total?: number;
}
