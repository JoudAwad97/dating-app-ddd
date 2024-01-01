import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';

export abstract class ChatsRepository extends RepositoryPort<ChatEntity> {}
