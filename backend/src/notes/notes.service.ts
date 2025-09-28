// src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from '../../users/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Create a new note for a specific user
  async createNote(userId: number, title: string, content: string): Promise<Note> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const note = this.noteRepository.create({ title, content, user });
    return this.noteRepository.save(note);
  }

  // Get all notes for a user
  async getNotes(userId: number): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  // Get a single note by its ID for a specific user
  async getNoteById(userId: number, noteId: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId, user: { id: userId } },
      relations: ['user'],
    });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  // Update a note's title and content
  async updateNote(userId: number, noteId: number, title: string, content: string): Promise<Note> {
    const note = await this.getNoteById(userId, noteId);
    note.title = title;
    note.content = content;
    return this.noteRepository.save(note);
  }

  // Delete a note
  async deleteNote(userId: number, noteId: number): Promise<Note> {
    const note = await this.getNoteById(userId, noteId);
    return this.noteRepository.remove(note);
  }
}
