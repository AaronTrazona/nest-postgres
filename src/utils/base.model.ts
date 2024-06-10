import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Model } from 'objection';

export class BaseModel extends Model {
  @ApiProperty()
  id: string;

  @ApiProperty({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt: string;
}
