import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserObject } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUsers(): Promise<UserObject[]> {
    return await this.prismaService.user.findMany({});
  }
}
