import { PaginationParams } from '@src/libs/databases/prisma/pagination.types';
import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';
import { ChatResponseDto } from '@src/modules/chat-management/chats/presenter/dto/output/chats.dto';

export abstract class ChatsRepository extends RepositoryPort<ChatEntity> {
  abstract getProfileChats(
    profileId: string,
    paginationParams: PaginationParams,
  ): Promise<ChatResponseDto[]>;

  abstract countProfileChats(profileId: string): Promise<number>;
}
