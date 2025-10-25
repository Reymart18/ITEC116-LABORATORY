import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  authorId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  genreId?: number;
}
