import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserObject } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserObject], { nullable: 'items' })
  async getUsers(): Promise<UserObject[]> {
    return this.userService.getUsers();
  }
}
