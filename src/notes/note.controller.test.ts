import { NotFoundException } from '@nestjs/common';
import { CreateNoteDto, NoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

jest.mock('./note.service');

describe('NoteController', () => {
  let noteService: jest.Mocked<NoteService>;
  let noteController: NoteController;
  const date = new Date().toISOString();

  beforeEach(() => {
    noteService = new NoteService() as jest.Mocked<NoteService>;
    noteController = new NoteController(noteService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createNote', () => {
    it('should able to create a note', async () => {
      const mockNote: NoteDto = {
        body: 'Test Body',
        title: 'Test Title',
        id: 'uuid',
        createdDate: date,
        updatedDate: date,
      };
      const createNoteDto: CreateNoteDto = {
        title: mockNote.title,
        body: mockNote.body,
      };

      noteService.createNote.mockResolvedValueOnce(mockNote);
      const note = await noteController.createNote(createNoteDto);

      expect(noteService.createNote).toHaveBeenCalledWith(createNoteDto);
      expect(note).toEqual(mockNote);
    });
  });

  describe('getNotes', () => {
    it('should able to get all notes', async () => {
      const mockNotes: NoteDto[] = [
        {
          body: 'Test 1 Body',
          title: 'Test 1 Title',
          id: 'test 1 id',
          createdDate: date,
          updatedDate: date,
        },
        {
          body: 'Test 2 Body',
          title: 'Test 2 Title',
          id: 'test 2 id',
          createdDate: date,
          updatedDate: date,
        },
        {
          body: 'Test 3 Body',
          title: 'Test 3 Title',
          id: 'test 3 id',
          createdDate: date,
          updatedDate: date,
        },
      ];

      noteService.getNotes.mockResolvedValueOnce(mockNotes);
      const note = await noteController.getNotes();

      expect(noteService.getNotes).toHaveBeenCalledWith();
      expect(note).toEqual(mockNotes);
    });
  });

  describe('getNoteById', () => {
    it('should able to get note by id', async () => {
      const mockNote: NoteDto = {
        body: 'Test Body',
        title: 'Test Title',
        id: 'uuid',
        createdDate: date,
        updatedDate: date,
      };

      noteService.getNoteById.mockResolvedValueOnce(mockNote);
      const note = await noteController.getNoteById(mockNote.id);

      expect(noteService.getNoteById).toHaveBeenCalledWith(mockNote.id);
      expect(note).toEqual(mockNote);
    });

    it('should throw not found exception', async () => {
      noteService.getNoteById.mockResolvedValueOnce(undefined);
      await expect(noteController.getNoteById('not found id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateNote', () => {
    it('should able to update note by id', async () => {
      const mockNote: NoteDto = {
        body: 'Test Body',
        title: 'Test Title',
        id: 'uuid',
        createdDate: date,
        updatedDate: date,
      };

      const modifyNote: UpdateNoteDto = {
        body: 'Test Body',
        title: 'Test Title',
      };

      noteService.updateNote.mockResolvedValueOnce(mockNote);
      const note = await noteController.updateNote(mockNote.id, modifyNote);

      expect(noteService.updateNote).toHaveBeenCalledWith(
        mockNote.id,
        modifyNote,
      );
      expect(note).toEqual(mockNote);
    });

    it('should throw not found exception', async () => {
      const modifyNote: UpdateNoteDto = {
        body: 'Test Body',
        title: 'Test Title',
      };

      noteService.updateNote.mockResolvedValueOnce(undefined);
      await expect(
        noteController.updateNote('not found id', modifyNote),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteNote', () => {
    it('should able to delete note by id', async () => {
      const mockNote: NoteDto = {
        body: 'Test Body',
        title: 'Test Title',
        id: 'uuid',
        createdDate: date,
        updatedDate: date,
      };

      noteService.getNoteById.mockResolvedValueOnce(mockNote);
      noteService.deleteNote.mockResolvedValueOnce();
      await noteController.deleteNote(mockNote.id);

      expect(noteService.deleteNote).toHaveBeenCalledWith(mockNote.id);
    });

    it('should throw not found exception', async () => {
      noteService.deleteNote.mockResolvedValueOnce();
      await expect(noteController.deleteNote('not found id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
