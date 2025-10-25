import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../authors/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto, file?: Express.Multer.File) {
    const normalizedTitle = (createBookDto.title || '').trim();
    const authorId = createBookDto.authorId ?? null;
    const categoryId = createBookDto.categoryId ?? null;

    // Check duplicate (same title+authorId+categoryId, case-insensitive for title)
    const qb = this.booksRepository.createQueryBuilder('b')
      .where('LOWER(b.title) = LOWER(:title)', { title: normalizedTitle });

    if (authorId === null) {
      qb.andWhere('b.authorId IS NULL');
    } else {
      qb.andWhere('b.authorId = :authorId', { authorId });
    }

    if (categoryId === null) {
      qb.andWhere('b.categoryId IS NULL');
    } else {
      qb.andWhere('b.categoryId = :categoryId', { categoryId });
    }

    const existing = await qb.getOne();
    if (existing) {
      throw new ConflictException('A book with the same Title, Author, and Category already exists.');
    }

    const book = this.booksRepository.create({
      ...createBookDto,
      title: normalizedTitle,
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
    // Find book first to know the author
    const book = await this.booksRepository.findOne({ where: { id } });
    await this.booksRepository.delete(id);

    // If the deleted book had an author, and no more books reference that author, delete the author too
    const authorId = book?.authorId ?? null;
    if (authorId) {
      const remaining = await this.booksRepository.count({ where: { authorId } });
      if (remaining === 0) {
        try {
          await this.authorsRepository.delete(authorId);
        } catch (e) {
          // swallow errors to not block book deletion
        }
      }
    }

    return { deleted: true };
  }
}
