import { CreateNoteDto, NoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let noteService: NoteService;
  const mockNotes: CreateNoteDto[] = [
    {
      body: 'Test 1 Body',
      title: 'Test 1 Title',
    },
    {
      body: 'Test 2 Body',
      title: 'Test 2 Title',
    },
    {
      body: 'Test 3 Body',
      title: 'Test 3 Title',
    },
  ];

  beforeEach(() => {
    noteService = new NoteService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createNote', () => {
    it('should able to create a note', async () => {
      const noteDto: CreateNoteDto = {
        body: 'Test Body',
        title: 'Test Title',
      };

      const note = await noteService.createNote(noteDto);

      expect(note.body).toBe(noteDto.body);
      expect(note.title).toBe(noteDto.title);
      expect(note.id).toBeDefined();
      expect(note.updatedDate).toBeDefined();
      expect(note.createdDate).toBeDefined();
    });
  });

  describe('getNotes', () => {
    it('should able to get all notes', async () => {
      const createNotePromises = mockNotes.map<Promise<NoteDto>>((noteDto) =>
        noteService.createNote(noteDto),
      );
      const createResponses = await Promise.all(createNotePromises);
      const notes = await noteService.getNotes();

      expect(notes).toHaveLength(3);
      expect(notes.length).toBe(createResponses.length);
    });
  });

  describe('getNoteById', () => {
    it('should able to get note by id', async () => {
      const createNotePromises = mockNotes.map<Promise<NoteDto>>((noteDto) =>
        noteService.createNote(noteDto),
      );
      const [, , thirdRes] = await Promise.all(createNotePromises);
      const note = await noteService.getNoteById(thirdRes.id);

      expect(note).toEqual(thirdRes);
      expect(note.id).toBe(thirdRes.id);
    });

    it('will response undefined if note id is not found', async () => {
      const note = await noteService.getNoteById('not found id');

      expect(note).toBeUndefined();
    });
  });

  describe('updateNote', () => {
    it('should able to update note by id', async () => {
      const createNotePromises = mockNotes.map<Promise<NoteDto>>((noteDto) =>
        noteService.createNote(noteDto),
      );
      const [, , thirdRes] = await Promise.all(createNotePromises);
      const modifyNote: UpdateNoteDto = {
        body: 'Test Body Updated',
        title: 'test Title Updated',
      };

      const note = await noteService.updateNote(thirdRes.id, modifyNote);

      expect(note.id).toBe(thirdRes.id);
      expect(note.body).toBe(modifyNote.body);
      expect(note.title).toBe(modifyNote.title);
    });

    it('will response null if note id is not found', async () => {
      const modifyNote: UpdateNoteDto = {
        body: 'Test Body Updated',
        title: 'test Title Updated',
      };
      const note = await noteService.updateNote('not found id', modifyNote);

      expect(note).toBeNull();
    });
  });

  describe('deleteNote', () => {
    it('should able to delete note by id', async () => {
      const createNotePromises = mockNotes.map<Promise<NoteDto>>((noteDto) =>
        noteService.createNote(noteDto),
      );
      const [, , thirdRes] = await Promise.all(createNotePromises);
      await noteService.deleteNote(thirdRes.id);
      const note = await noteService.getNoteById(thirdRes.id);

      expect(note).toBeUndefined();
    });
  });
});
