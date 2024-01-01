import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatResponseDto } from '../dto/output/chats.dto';
import { ChatsApplicationService } from '../../application/ports/chats.application.service.port';
import { ChatsCreateDto } from '../dto/input/chats-create.dto';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';

@Resolver(() => ChatResponseDto)
export class ChatsResolver {
  constructor(
    private readonly chatApplicationService: ChatsApplicationService,
  ) {}

  @Mutation(() => ChatResponseDto)
  async createChat(
    @Args('input') input: ChatsCreateDto,
  ): Promise<ChatResponseDto> {
    return this.chatApplicationService.createChat(input);
  }

  @ResolveField(() => ProfilePaginatedResponseDto)
  async members(
    @Parent() chat: ChatResponseDto,
    @Args('input') input: PaginatedQueryRequestDto,
  ): Promise<ProfilePaginatedResponseDto> {
    return this.chatApplicationService.getChatMembers(chat.id, input);
  }
}
