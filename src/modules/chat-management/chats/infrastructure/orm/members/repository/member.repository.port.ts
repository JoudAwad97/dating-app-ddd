import { Prisma } from '@prisma/client';
import { RepositoryPort } from '@src/libs/ports/repository.port';
import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';

export abstract class MembersRepository extends RepositoryPort<MembersEntity> {
  abstract getPaginatedChatMembers(
    chatId: string,
    take: number,
    cursor: string | undefined,
    orderBy: Prisma.ChatMemberOrderByWithRelationInput,
  ): Promise<MembersEntity[]>;
  abstract countChatMembers(chatId: string): Promise<number>;
}
