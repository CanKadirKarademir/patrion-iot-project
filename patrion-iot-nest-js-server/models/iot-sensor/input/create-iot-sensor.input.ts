import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIotSensorInput {
  @ApiProperty({
    type: String,
    description: 'The Id of the sensor',
    example: 'Sensor1234',
  })
  @IsString()
  sensorId: string;
}
