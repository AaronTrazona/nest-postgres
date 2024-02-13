import { Injectable } from '@nestjs/common';
import { CreateNoteDto, NoteDto, UpdateNoteDto } from './dto/note.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NoteService {
  notes: NoteDto[] = [];

  async createNote(createNoteDto: CreateNoteDto): Promise<NoteDto> {
    const date = new Date().toISOString();
    const note = {
      id: uuidv4(),
      body: createNoteDto.body,
      title: createNoteDto.title,
      updatedDate: date,
      createdDate: date,
    };
    this.notes.unshift(note);

    return note;
  }

  async getNotes(): Promise<NoteDto[]> {
    return this.notes;
  }

  async getNoteById(noteId: string): Promise<NoteDto> {
    return this.notes.find((e) => e.id === noteId);
  }

  async updateNote(
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDto> {
    let note = this.notes.find((e) => e.id === noteId);

    if (!note) {
      return null;
    }

    this.notes = this.notes.filter((e) => e.id !== noteId);
    note = {
      ...note,
      body: updateNoteDto.body || note.body,
      title: updateNoteDto.title || note.title,
    };
    this.notes.unshift(note);

    return note;
  }

  async deleteNote(noteId: string) {
    this.notes = this.notes.filter((e) => e.id !== noteId);
  }
}
