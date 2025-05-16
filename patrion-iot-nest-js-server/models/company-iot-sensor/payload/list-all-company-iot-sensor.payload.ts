import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IdAbstract } from 'models/abstracts';
import { CreateCompanyIotSensorInput } from '../input';

export class ListAllCompanyIotSensorPayload extends IntersectionType(
  IdAbstract,
  CreateCompanyIotSensorInput,
) {
  @ApiProperty({
    type: String,
    description: 'First Name',
    example: '1234567890',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: '1234567890',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: '1234567890',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Role',
    example: '1234567890',
  })
  role: string;

  @ApiProperty({
    type: String,
    description: 'Sensor Id',
    example: '1234567890',
  })
  sensorId: string;
}
