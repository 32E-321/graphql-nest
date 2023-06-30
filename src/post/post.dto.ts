import { Field, InputType } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostRequest implements Pick<Post, 'userId' | 'contents'> {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  contents: string;
}
@InputType()
export class DeletePostRequest implements Pick<Post, 'postId'> {
  @Field()
  @IsString()
  postId: string;
}

@InputType()
export class UpdatePostRequest implements Pick<Post, 'postId'> {
  @Field()
  postId: string;

  //   optionalがない？？
  @Field({ nullable: true })
  contents?: string;
}
@InputType()
export class GetMyPostsRequest implements Pick<Post, 'userId'> {
  @Field()
  userId: string;
}
