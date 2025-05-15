import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Token',
  })
  token: string;
}
