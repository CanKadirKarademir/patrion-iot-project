import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRoleEnum } from 'models/enums';

export class CreateUserInput {
  @ApiProperty({
    type: String,
    description: 'The first name of the user',
    example: 'John',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'The first name of the user',
    example: 'John',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    example: 'email@email.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: 'password123',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'The state of the registration',
    example: 'registered',
    enum: UserRoleEnum,
    enumName: 'Registration State',
  })
  @IsString()
  role: UserRoleEnum;
}
