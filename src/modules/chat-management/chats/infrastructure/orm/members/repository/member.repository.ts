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
}
