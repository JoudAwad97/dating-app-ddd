import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { ChatsCreateDto } from '../../presenter/dto/input/chats-create.dto';
import {
  ChatPaginatedResponseDto,
  ChatResponseDto,
} from '../../presenter/dto/output/chats.dto';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { AssignMemberToChatDto } from '../../presenter/dto/input/assign-member.dto';
import { ChatQueryDto } from '../../presenter/dto/input/paginated-chat.dto';

export abstract class ChatsApplicationService {
  abstract createChat(input: ChatsCreateDto): Promise<ChatResponseDto>;
  abstract getChatsForProfile(
    input: ChatQueryDto,
  ): Promise<ChatPaginatedResponseDto>;
  abstract getChatMembers(
    chatId: string,
    input: PaginatedQueryRequestDto,
  ): Promise<ProfilePaginatedResponseDto>;
  abstract addMemberToChat(
    input: AssignMemberToChatDto,
  ): Promise<ChatResponseDto>;
}
