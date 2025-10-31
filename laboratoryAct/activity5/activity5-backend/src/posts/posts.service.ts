import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async createPost(data: { title: string; content: string; author: User; mediaUrl?: string }) {
    const post = this.postsRepository.create(data);
    return this.postsRepository.save(post);
  }

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async updatePost(id: number, userId: number, data: { title?: string; content?: string; mediaUrl?: string }) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }

    if (data.title !== undefined) post.title = data.title;
    if (data.content !== undefined) post.content = data.content;
    if (data.mediaUrl !== undefined) post.mediaUrl = data.mediaUrl;

    return this.postsRepository.save(post);
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }

    await this.postsRepository.remove(post);
    return { message: 'Post deleted successfully' };
  }
}
