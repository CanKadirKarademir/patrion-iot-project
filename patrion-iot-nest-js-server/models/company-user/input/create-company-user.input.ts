import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyUserInput {
  @ApiProperty({
    type: String,
    description: 'Company ID',
    example: '12345678-1234-1234-1234',
    required: true,
  })
  @IsString()
  companyId: string;

  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '12345678-1234-1234-1234',
    required: true,
  })
  @IsString()
  userId: string;
}
