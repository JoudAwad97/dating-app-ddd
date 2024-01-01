import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChatResponseDto } from '../dto/output/chats.dto';
import { ChatsApplicationService } from '../../application/ports/chats.application.service.port';
import { ChatsCreateDto } from '../dto/input/chats-create.dto';

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
}
