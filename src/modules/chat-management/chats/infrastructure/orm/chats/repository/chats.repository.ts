import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';
import { ChatDatabaseModel } from '../schema/chat.schema';
import { ChatsRepository } from './chats.repository.port';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ChatsMapper } from '../mapper/chats.mapper.port';
import {
  OrderByTypes,
  PaginationParams,
} from '@src/libs/databases/prisma/pagination.types';
import { ChatResponseDto } from '@src/modules/chat-management/chats/presenter/dto/output/chats.dto';

@Injectable()
export class ChatsRepositoryImpl
  extends BaseOrmEntityRepository<ChatEntity, ChatDatabaseModel, 'Chat'>
  implements ChatsRepository
{
  protected modelName: Prisma.ModelName = 'Chat';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: ChatsMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }

  async getProfileChats(
    profileId: string,
    { cursor, take = 20, orderBy = { id: OrderByTypes.ASC } }: PaginationParams,
  ): Promise<ChatResponseDto[]> {
    return this.prismaService.chat
      .findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take,
        orderBy,
        where: {
          members: {
            some: {
              profileId,
            },
          },
        },
        skip: cursor ? 1 : undefined,
      })
      .then((res) => res.map(this.mapper.mapPersistenceToResponse));
  }

  async countProfileChats(profileId: string): Promise<number> {
    return this.prismaService.chatMember.count({
      where: {
        profileId,
      },
    });
  }
}
