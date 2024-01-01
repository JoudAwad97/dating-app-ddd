import { ChatsCreateDto } from '../../presenter/dto/input/chats-create.dto';
import { ChatResponseDto } from '../../presenter/dto/output/chats.dto';

export abstract class ChatsApplicationService {
  abstract createChat(input: ChatsCreateDto): Promise<ChatResponseDto>;
}
