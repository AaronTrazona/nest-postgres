import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Delete,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto, NoteDto, UpdateNoteDto } from './dto/note.dto';
import { ParseEmptyStringPipe } from './pipes/parse-empty-string.pipe';
import { NoteService } from './note.service';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({
    summary: 'Add Note',
    description: 'Create new note',
    operationId: 'createNote',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Note has been created',
    type: NoteDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'title or body is empty',
  })
  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }

  @ApiOperation({
    summary: 'Get all notes',
    description: 'Retrieve all notes',
    operationId: 'getNotes',
  })
  @ApiResponse({ status: HttpStatus.OK, type: NoteDto, isArray: true })
  @Get()
  async getNotes() {
    return this.noteService.getNotes();
  }

  @ApiOperation({
    summary: 'Get note by id',
    description: 'Retrieve note using note id',
    operationId: 'getNoteById',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the note',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: NoteDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Note not found' })
  @Get('/:id')
  async getNoteById(@Param('id', ParseEmptyStringPipe) noteId: string) {
    const note = await this.noteService.getNoteById(noteId);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  @ApiOperation({
    summary: 'Update note by id',
    description: 'Modify note using note id',
    operationId: 'updateNote',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the note',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Note has been updated',
    type: NoteDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'title and body is empty',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Note not found' })
  @Put('/:id')
  async updateNote(
    @Param('id', ParseEmptyStringPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const note = await this.noteService.updateNote(noteId, updateNoteDto);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  @ApiOperation({
    summary: 'Delete note by id',
    description: 'Remove note using note id',
    operationId: 'deleteNote',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the note',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Note successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Note not found' })
  @Delete('/:id')
  async deleteNote(@Param('id', ParseEmptyStringPipe) noteId: string) {
    const note = await this.noteService.getNoteById(noteId);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return this.noteService.deleteNote(noteId);
  }
}
