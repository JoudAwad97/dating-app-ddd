import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  ChatPaginatedResponseDto,
  ChatResponseDto,
} from '../dto/output/chats.dto';
import { ChatsApplicationService } from '../../application/ports/chats.application.service.port';
import { ChatsCreateDto } from '../dto/input/chats-create.dto';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { AssignMemberToChatDto } from '../dto/input/assign-member.dto';
import { ChatQueryDto } from '../dto/input/paginated-chat.dto';

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

  @Mutation(() => ChatResponseDto)
  async addMemberToChat(
    @Args('input') input: AssignMemberToChatDto,
  ): Promise<ChatResponseDto> {
    return this.chatApplicationService.addMemberToChat(input);
  }

  @Query(() => ChatPaginatedResponseDto)
  async chats(@Args('input') input: ChatQueryDto) {
    return this.chatApplicationService.getChatsForProfile(input);
  }

  @ResolveField(() => ProfilePaginatedResponseDto)
  async members(
    @Parent() chat: ChatResponseDto,
    @Args('input') input: PaginatedQueryRequestDto,
  ): Promise<ProfilePaginatedResponseDto> {
    return this.chatApplicationService.getChatMembers(chat.id, input);
  }
}
