// src/notes/notes.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Headers, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

// Helper to extract fake userId from token
private getUserId(auth?: string): number {
    if (!auth) {
      throw new Error('Authorization header missing');
    }
    const parts = auth.split('-');
    const idStr = parts.pop();
    if (!idStr) {
      throw new Error('Invalid token format');
    }
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      throw new Error('Invalid user ID in token');
    }
    return id;
  }
  

  @Post()
  createNote(@Headers('authorization') auth: string, @Body() body: { title: string; content: string }) {
    const userId = this.getUserId(auth);
    return this.notesService.createNote(userId, body.title, body.content);
  }

  @Get()
  getNotes(@Headers('authorization') auth: string) {
    const userId = this.getUserId(auth);
    return this.notesService.getNotes(userId);
  }

  @Get(':id')
  getNote(@Headers('authorization') auth: string, @Param('id') id: string) {
    const userId = this.getUserId(auth);
    return this.notesService.getNoteById(userId, parseInt(id));
  }

  @Patch(':id')
  updateNote(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    const userId = this.getUserId(auth);
    return this.notesService.updateNote(userId, parseInt(id), body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Headers('authorization') auth: string, @Param('id') id: string) {
    const userId = this.getUserId(auth);
    return this.notesService.deleteNote(userId, parseInt(id));
  }
}
