import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';
import { ChatDatabaseModel } from '../schema/chat.schema';
import { ChatResponseDto } from '@src/modules/chat-management/chats/presenter/dto/output/chats.dto';
import { Mapper } from '@src/libs/ddd';

export abstract class ChatsMapper extends Mapper<
  ChatEntity,
  ChatDatabaseModel,
  ChatResponseDto
> {}
