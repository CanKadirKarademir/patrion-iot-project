import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ListIotSensorHistoryInput {
  @ApiProperty({
    type: String,
    description: 'The ID of the sensor to list history for',
    example: '1234567890abcdef12345678',
  })
  @IsUUID()
  sensorId: string;
}
