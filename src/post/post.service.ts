import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  DeletePostResponse,
  PostObject,
  PostWithChildObject,
  UpdatePostResponse,
} from './post.model';
import { randomUUID } from 'crypto';
import {
  CreatePostRequest,
  DeletePostRequest,
  GetMyPostsRequest,
  UpdatePostRequest,
} from './post.dto';
@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async getPosts(): Promise<PostObject[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }
  async getMyPosts({ userId }: GetMyPostsRequest): Promise<PostObject[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }
  async createPost({
    contents,
    userId,
  }: CreatePostRequest): Promise<PostWithChildObject> {
    await this.prismaService.post.create({
      data: {
        postId: randomUUID(),
        contents,
        userId,
      },
    });
    return {
      postId: randomUUID(),
      contents,
      userId,
      childObject: {
        contents: 'child',
      },
    };
  }
  async deletePost({ postId }: DeletePostRequest): Promise<DeletePostResponse> {
    await this.prismaService.post.delete({
      where: {
        postId,
      },
    });
    // graphqlでは空のオブジェクトを返せない
    return { success: true };
  }
  async updatePost({
    postId,
    contents,
  }: UpdatePostRequest): Promise<UpdatePostResponse> {
    await this.prismaService.post.update({
      where: {
        postId,
      },
      //   空だったら何もしない
      // 本当はフロントでバリデーションをするがUI実装していないので
      data: {
        ...(contents && { contents }),
      },
    });
    return {
      success: true,
    };
  }
}
