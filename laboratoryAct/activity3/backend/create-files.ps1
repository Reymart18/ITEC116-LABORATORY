# Script to create all NestJS backend files

$srcPath = "c:\xampp\htdocs\BOOKSHELF ACT 3\backend\src"

# Book Entity
$bookEntity = @'
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

  @ManyToOne(() => Author, { eager: true, nullable: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => Category, { eager: true, nullable: true })
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
'@

# Book DTOs
$createBookDto = @'
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  feedback?: string;

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  genreId?: number;
}
'@

$updateBookDto = @'
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
'@

# Book Controller
$bookController = @'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.booksService.create(createBookDto, file);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.booksService.update(+id, updateBookDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
'@

# Book Service
$bookService = @'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, file?: Express.Multer.File) {
    const book = this.booksRepository.create({
      ...createBookDto,
      coverImage: file ? `/uploads/${file.filename}` : null,
    });
    return this.booksRepository.save(book);
  }

  findAll() {
    return this.booksRepository.find({
      relations: ['author', 'category', 'genre'],
    });
  }

  findOne(id: number) {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'genre'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto, file?: Express.Multer.File) {
    const updateData: any = { ...updateBookDto };
    if (file) {
      updateData.coverImage = `/uploads/${file.filename}`;
    }
    await this.booksRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.booksRepository.delete(id);
    return { deleted: true };
  }
}
'@

# Book Module
$bookModule = @'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
'@

# Author Entity
$authorEntity = @'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;
}
'@

# Author DTOs
$createAuthorDto = @'
import { IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
'@

$updateAuthorDto = @'
import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
'@

# Author Controller
$authorController = @'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
'@

# Author Service
$authorService = @'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  findAll() {
    return this.authorsRepository.find();
  }

  findOne(id: number) {
    return this.authorsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.authorsRepository.delete(id);
    return { deleted: true };
  }
}
'@

# Author Module
$authorModule = @'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { Author } from './author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
'@

# Category Entity
$categoryEntity = @'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
'@

# Category DTOs
$createCategoryDto = @'
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
}
'@

$updateCategoryDto = @'
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
'@

# Category Controller
$categoryController = @'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
'@

# Category Service
$categoryService = @'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.categoriesRepository.delete(id);
    return { deleted: true };
  }
}
'@

# Category Module
$categoryModule = @'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
'@

# Genre Entity
$genreEntity = @'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
'@

# Genre DTOs
$createGenreDto = @'
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  name: string;
}
'@

$updateGenreDto = @'
import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
'@

# Genre Controller
$genreController = @'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id);
  }
}
'@

# Genre Service
$genreService = @'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    const genre = this.genresRepository.create(createGenreDto);
    return this.genresRepository.save(genre);
  }

  findAll() {
    return this.genresRepository.find();
  }

  findOne(id: number) {
    return this.genresRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.genresRepository.update(id, updateGenreDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.genresRepository.delete(id);
    return { deleted: true };
  }
}
'@

# Genre Module
$genreModule = @'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
'@

# Write all files
Write-Host "Creating Books module files..."
New-Item -ItemType Directory -Force -Path "$srcPath\books\dto" | Out-Null
$bookEntity | Out-File -FilePath "$srcPath\books\book.entity.ts" -Encoding utf8
$createBookDto | Out-File -FilePath "$srcPath\books\dto\create-book.dto.ts" -Encoding utf8
$updateBookDto | Out-File -FilePath "$srcPath\books\dto\update-book.dto.ts" -Encoding utf8
$bookController | Out-File -FilePath "$srcPath\books\books.controller.ts" -Encoding utf8
$bookService | Out-File -FilePath "$srcPath\books\books.service.ts" -Encoding utf8
$bookModule | Out-File -FilePath "$srcPath\books\books.module.ts" -Encoding utf8

Write-Host "Creating Authors module files..."
New-Item -ItemType Directory -Force -Path "$srcPath\authors\dto" | Out-Null
$authorEntity | Out-File -FilePath "$srcPath\authors\author.entity.ts" -Encoding utf8
$createAuthorDto | Out-File -FilePath "$srcPath\authors\dto\create-author.dto.ts" -Encoding utf8
$updateAuthorDto | Out-File -FilePath "$srcPath\authors\dto\update-author.dto.ts" -Encoding utf8
$authorController | Out-File -FilePath "$srcPath\authors\authors.controller.ts" -Encoding utf8
$authorService | Out-File -FilePath "$srcPath\authors\authors.service.ts" -Encoding utf8
$authorModule | Out-File -FilePath "$srcPath\authors\authors.module.ts" -Encoding utf8

Write-Host "Creating Categories module files..."
New-Item -ItemType Directory -Force -Path "$srcPath\categories\dto" | Out-Null
$categoryEntity | Out-File -FilePath "$srcPath\categories\category.entity.ts" -Encoding utf8
$createCategoryDto | Out-File -FilePath "$srcPath\categories\dto\create-category.dto.ts" -Encoding utf8
$updateCategoryDto | Out-File -FilePath "$srcPath\categories\dto\update-category.dto.ts" -Encoding utf8
$categoryController | Out-File -FilePath "$srcPath\categories\categories.controller.ts" -Encoding utf8
$categoryService | Out-File -FilePath "$srcPath\categories\categories.service.ts" -Encoding utf8
$categoryModule | Out-File -FilePath "$srcPath\categories\categories.module.ts" -Encoding utf8

Write-Host "Creating Genres module files..."
New-Item -ItemType Directory -Force -Path "$srcPath\genres\dto" | Out-Null
$genreEntity | Out-File -FilePath "$srcPath\genres\genre.entity.ts" -Encoding utf8
$createGenreDto | Out-File -FilePath "$srcPath\genres\dto\create-genre.dto.ts" -Encoding utf8
$updateGenreDto | Out-File -FilePath "$srcPath\genres\dto\update-genre.dto.ts" -Encoding utf8
$genreController | Out-File -FilePath "$srcPath\genres\genres.controller.ts" -Encoding utf8
$genreService | Out-File -FilePath "$srcPath\genres\genres.service.ts" -Encoding utf8
$genreModule | Out-File -FilePath "$srcPath\genres\genres.module.ts" -Encoding utf8

Write-Host "All files created successfully!"
