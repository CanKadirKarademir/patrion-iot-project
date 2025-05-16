import { ApiProperty } from '@nestjs/swagger';

export class SensorDataInput {
  @ApiProperty({
    type: String,
    description: 'The ID of the sensor',
    example: '1234567890abcdef12345678',
  })
  sensor_id?: string;

  @ApiProperty({
    type: String,
    description: 'The timestamp of the sensor data',
    example: '1234567890abcdef12345678',
  })
  timestamp?: Date;

  @ApiProperty({
    type: Number,
    description: 'The temperature reading from the sensor',
    example: 25.5,
  })
  temperature?: number;

  @ApiProperty({
    type: Number,
    description: 'The humidity reading from the sensor',
    example: 60.5,
  })
  humidity?: number;
}
