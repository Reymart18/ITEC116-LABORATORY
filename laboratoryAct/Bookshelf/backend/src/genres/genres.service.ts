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
