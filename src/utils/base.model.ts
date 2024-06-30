import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Model } from 'objection';

export class BaseModel extends Model {
  @ApiProperty()
  id: string;

  @ApiProperty({ name: 'updatedAt' })
  updatedAt: string;

  @ApiProperty({ name: 'createdAt' })
  createdAt: string;
}
