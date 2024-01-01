import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { MembersRepository } from './member.repository.port';
import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';
import { MemberDatabaseModel } from '../schema/members.schema';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { MemberMapper } from '../mapper/member.mapper.port';

@Injectable()
export class MembersRepositoryImpl
  extends BaseOrmEntityRepository<
    MembersEntity,
    MemberDatabaseModel,
    'ChatMember'
  >
  implements MembersRepository
{
  protected modelName: Prisma.ModelName = 'ChatMember';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: MemberMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }

  async findByChatIdAndProfileId(
    chatId: string,
    profileId: string,
  ): Promise<MembersEntity | null> {
    return this.prismaService.chatMember
      .findFirst({
        where: {
          chatId,
          profileId,
        },
      })
      .then((res) => (res ? this.mapper.toDomain(res) : null));
  }

  async countChatMembers(chatId: string): Promise<number> {
    return this.prismaService.chatMember.count({
      where: {
        chatId,
      },
    });
  }

  async getPaginatedChatMembers(
    chatId: string,
    take: number = 20,
    cursor: string | undefined,
    orderBy: Prisma.LikeOrderByWithRelationInput = { id: 'asc' },
  ): Promise<MembersEntity[]> {
    return this.prismaService.chatMember
      .findMany({
        take,
        skip: cursor ? 1 : 0,
        where: {
          chatId,
        },
        orderBy,
        cursor: cursor ? { id: cursor } : undefined,
      })
      .then((res) => res.map((member) => this.mapper.toDomain(member)));
  }
}
