import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'src/users/user.entity';
import { Note } from './notes/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',        // XAMPP default
      database: 'activity2_db',
      entities: [User, Note],
      synchronize: true,   // auto-create tables for dev
    }),
    UsersModule,
    NotesModule,
    AuthModule,
  ],
})
export class AppModule {}
