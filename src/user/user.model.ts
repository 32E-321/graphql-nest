import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post, User } from '@prisma/client';

@ObjectType()
export class UserObject implements User {
  @Field()
  userId: string;

  @Field()
  userName: string;

  @Field()
  accountId: string;
}
