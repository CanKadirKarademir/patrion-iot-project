import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateEntryInput {
  @ApiProperty({ description: 'Sensor ID', example: 'sensor_123' })
  @IsString()
  sensor_id: string;

  @ApiProperty({ description: 'Timestamp', example: 34 })
  @IsNumber()
  temperature: number;

  @ApiProperty({ description: 'Timestamp', example: 34 })
  @IsNumber()
  humidity: number;

  @ApiProperty({ description: 'Timestamp', example: 3232323 })
  @IsNumber()
  timestamp: number;
}
