import { Controller, Post, Body, UploadedFile, UseInterceptors, Req, UseGuards, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { Request } from 'express';
import { User } from '../users/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async createPost(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const user = req.user as User;
    const mediaUrl = file ? `http://localhost:3001/uploads/${file.filename}` : undefined;

    return this.postsService.createPost({
      title: body.title,
      content: body.content,
      author: user,
      mediaUrl,
    });
  }

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }
}
