import { PaginationParams } from '@src/libs/databases/prisma/pagination.types';
import { RepositoryPort } from '@src/libs/ports/repository.port';
import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';

export abstract class MembersRepository extends RepositoryPort<MembersEntity> {
  abstract getPaginatedChatMembers(
    chatId: string,
    paginatedParams: PaginationParams,
  ): Promise<MembersEntity[]>;
  abstract countChatMembers(chatId: string): Promise<number>;
  abstract findByChatIdAndProfileId(
    chatId: string,
    profileId: string,
  ): Promise<MembersEntity | null>;
}
