import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';
import { ChatDatabaseModel } from '../schema/chat.schema';
import { ChatsRepository } from './chats.repository.port';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ChatsMapper } from '../mapper/chats.mapper.port';

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
}
