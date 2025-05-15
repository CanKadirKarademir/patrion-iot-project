import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyInput {
  @ApiProperty({ description: 'Company name', example: 'My Company' })
  @IsString()
  name: string;
}
