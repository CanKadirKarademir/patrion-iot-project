import { ApiProperty } from '@nestjs/swagger';

export class IdAbstract {
  @ApiProperty({
    example: 'UUID',
    description: 'Id Of The Entity',
    required: true,
  })
  id: string;
}
