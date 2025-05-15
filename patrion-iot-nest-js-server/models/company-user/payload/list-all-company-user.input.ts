import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IdAbstract } from 'models/abstracts';
import { CreateCompanyUserInput } from '../input';

export class ListAllCompanyUserPayload extends IntersectionType(
  IdAbstract,
  CreateCompanyUserInput,
) {
  @ApiProperty({
    type: String,
    description: 'Company Name',
    example: 'Company Name',
    required: true,
  })
  companyName: string;

  @ApiProperty({
    type: String,
    description: 'User First Name',
    example: 'John',
    required: true,
  })
  userFirstName: string;

  @ApiProperty({
    type: String,
    description: 'User Last Name',
    example: 'Doe',
    required: true,
  })
  userLastName: string;

  @ApiProperty({
    type: String,
    description: 'User Email',
    example: '',
    required: true,
  })
  userEmail: string;

  @ApiProperty({
    type: String,
    description: 'User Role',
    example: 'USER',
    required: true,
  })
  role: string;
}
