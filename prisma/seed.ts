import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const accountIds = { account1: 'account1', account2: 'account2' };
const userIds = { userId1: 'user1', userId2: 'user2' };
const userNames = { user1: 'John', user2: 'Mika' };
const postIds = { postId1: 'post1' };
const account1: Prisma.AccountCreateInput = {
  accountId: accountIds.account1,
  email: 'user1@test.com',
  password: 'password',
};
const account2: Prisma.AccountCreateInput = {
  accountId: accountIds.account2,
  email: 'user2@test.com',
  password: 'password',
};
const user1: Prisma.UserCreateManyInput = {
  userId: userIds.userId1,
  accountId: accountIds.account1,
  userName: userNames.user1,
  //   creteManyInputは要らないらしい→ドキュメント見る
  //   account: {
  //     connect: {
  //       accountId: accountIds.account1,
  //     },
  //   },
};
const user2: Prisma.UserCreateManyInput = {
  userId: userIds.userId2,
  accountId: accountIds.account2,
  userName: userNames.user2,
};
const post: Prisma.PostCreateManyInput = {
  postId: postIds.postId1,
  contents: 'HogeHoge',
  userId: userIds.userId1,
};

const favorite: Prisma.FavoriteCreateInput = {
  userId: userIds.userId2,
  postId: postIds.postId1,
};
try {
  prisma.$transaction(async (tx) => {
    await tx.account.createMany({
      data: [account1, account2],
    });
    await tx.user.createMany({
      data: [user1, user2],
    });
    await tx.post.createMany({
      data: [post],
    });
    await tx.favorite.createMany({
      data: [favorite],
    });
  });
} catch (error) {
  console.error(error);
}
