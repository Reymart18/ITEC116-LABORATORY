import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async addComment(content: string, post: Post, author: User, parent?: Comment, mediaUrl?: string) {
    const comment = this.commentsRepository.create({ content, post, author, parent, mediaUrl });
    return this.commentsRepository.save(comment);
  }

  async getCommentsForPost(postId: number) {
    const comments = await this.commentsRepository.find({
      where: { post: { id: postId }, parent: IsNull() },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });

    const loadReplies = async (comment: Comment) => {
      const replies = await this.commentsRepository.find({
        where: { parent: { id: comment.id } },
        relations: ['author'],
        order: { createdAt: 'ASC' },
      });
      comment.replies = replies;
      for (const reply of replies) {
        await loadReplies(reply);
      }
    };

    for (const comment of comments) {
      await loadReplies(comment);
    }

    return comments;
  }

  async editComment(id: number, user: User, body: any) {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.id !== user.id) throw new ForbiddenException('Cannot edit others’ comment');

    comment.content = body.content ?? comment.content;
    if (body.mediaUrl !== undefined) comment.mediaUrl = body.mediaUrl;
    return this.commentsRepository.save(comment);
  }

  async deleteComment(id: number, user: User) {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.id !== user.id) throw new ForbiddenException('Cannot delete others’ comment');

    return this.commentsRepository.remove(comment);
  }
}
