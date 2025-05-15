import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyIotSensorInput {
  @ApiProperty({
    type: String,
    description: 'Company ID',
    example: '1234567890',
  })
  @IsString()
  companyId: string;

  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '1234567890',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    type: String,
    description: 'IoT Sensor ID',
    example: '1234567890',
  })
  @IsString()
  iotSensorId: string;
}
