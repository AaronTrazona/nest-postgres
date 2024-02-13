import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class NoteDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  updatedDate: string;

  @ApiProperty()
  createdDate: string;
}

export class CreateNoteDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  body: string;
}

export class UpdateNoteDto {
  @ApiProperty()
  @ValidateIf((e) => !e.body || e.title)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @ValidateIf((e) => !e.title || e.body)
  @IsNotEmpty()
  body: string;
}
