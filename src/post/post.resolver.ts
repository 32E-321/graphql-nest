import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import {
  DeletePostResponse,
  PostObject,
  PostWithChildObject,
  UpdatePostResponse,
} from './post.model';
import {
  CreatePostRequest,
  DeletePostRequest,
  GetMyPostsRequest,
} from './post.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  //   graphqlに認識させる
  @Query(() => [PostObject], { nullable: 'itemsAndList' })
  async getPosts(): Promise<PostObject[]> {
    return await this.postService.getPosts();
  }
  @Mutation(() => [PostObject])
  async getMyPosts(
    @Args('GetMyPostsRequest') getMyPostsRequest: GetMyPostsRequest,
  ): Promise<PostObject[]> {
    return await this.postService.getMyPosts(getMyPostsRequest);
  }
  //   RESTのPostみたいなやつ
  //   レスポンスが配列じゃなかったらnullableは選択できない
  @Mutation(() => PostWithChildObject)
  async createPost(
    @Args('CreatePostRequest') createPostRequest: CreatePostRequest,
  ): Promise<PostWithChildObject> {
    return await this.postService.createPost(createPostRequest);
  }

  @Mutation(() => DeletePostResponse)
  async deletePost(
    @Args('DeletePostRequest') deletePostRequest: DeletePostRequest,
  ): Promise<{}> {
    return await this.postService.deletePost(deletePostRequest);
  }
  @Mutation(() => UpdatePostResponse)
  async updatePost(
    @Args('DeletePostRequest') deletePostRequest: DeletePostRequest,
  ): Promise<{}> {
    return await this.postService.deletePost(deletePostRequest);
  }
}
