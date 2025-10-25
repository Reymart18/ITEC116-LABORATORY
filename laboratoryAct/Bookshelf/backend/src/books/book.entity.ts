import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Category } from '../categories/category.entity';
import { Genre } from '../genres/genre.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  feedback: string;

  @CreateDateColumn()
  dateAdded: Date;

  @ManyToOne(() => Author, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => Category, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Genre, { eager: true, nullable: true })
  @JoinColumn({ name: 'genreId' })
  genre: Genre;

  @Column({ nullable: true })
  genreId: number;
}
