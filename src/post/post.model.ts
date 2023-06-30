import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '@prisma/client';

@ObjectType()
export class PostObject implements Post {
  @Field(() => String)
  postId: string;

  @Field()
  contents: string;

  @Field()
  userId: string;
}

// プロパティにオブジェクトも指定できる
// この場合、exportしなくても型としてschema.gqlファイルが変更される
@ObjectType()
class ChildObject {
  @Field()
  contents: string;
}

@ObjectType()
export class PostWithChildObject implements Post {
  @Field(() => String)
  postId: string;

  @Field()
  contents: string;

  @Field()
  userId: string;

  @Field(() => ChildObject)
  childObject: ChildObject;
}
// 空のオブジェクトは弾かれる →少なくとも一つのカラムが必要
@ObjectType()
export class DeletePostResponse {
  @Field()
  success: boolean;
}
@ObjectType()
export class UpdatePostResponse {
  @Field()
  success: boolean;
}
