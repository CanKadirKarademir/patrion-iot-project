import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email of the User',
    example: 'email@email.com',
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Password of the User',
    example: 'password',
  })
  @IsString()
  password: string;
}
