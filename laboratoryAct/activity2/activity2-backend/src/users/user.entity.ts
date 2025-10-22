// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // ✅ Fixed types below:
  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true }) // 👈 MySQL requires explicit type
  verificationToken: string | null;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}