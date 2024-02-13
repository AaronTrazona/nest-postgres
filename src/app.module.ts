import { Module } from '@nestjs/common';
import { NoteModule } from './notes/note.module';

@Module({
  imports: [NoteModule],
})
export class AppModule {}
