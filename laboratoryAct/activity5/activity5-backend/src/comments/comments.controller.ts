import {
    Controller,
    Post,
    Body,
    Param,
    Req,
    UseGuards,
    Get,
    Patch,
    Delete,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Request } from 'express';
  import { User } from '../users/user.entity';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post(':postId')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    async addComment(
      @Param('postId') postId: number,
      @Body() body: any,
      @Req() req: Request,
      @UploadedFile() file?: Express.Multer.File, // ✅ fixed
    ) {
      const user = req.user as User;
      const { content, parentId } = body;
      const mediaUrl = file ? `http://localhost:3001/uploads/${file.filename}` : undefined;
      return this.commentsService.addComment(
        content,
        { id: postId } as any,
        user,
        parentId ? ({ id: parentId } as any) : null,
        mediaUrl,
      );
    }
  
    @Get(':postId')
    async getComments(@Param('postId') postId: number) {
      return this.commentsService.getCommentsForPost(postId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editComment(@Param('id') id: number, @Body() body: any, @Req() req: Request) {
      const user = req.user as User;
      return this.commentsService.editComment(id, user, body);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteComment(@Param('id') id: number, @Req() req: Request) {
      const user = req.user as User;
      return this.commentsService.deleteComment(id, user);
    }
  }
  