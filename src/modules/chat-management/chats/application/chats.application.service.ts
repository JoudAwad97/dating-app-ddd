import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ChatEntity } from '../domain/chats/chat.entity';
import { ChatErrors } from '../domain/chats/chat.errors';
import { ChatService } from '../domain/chats/chat.service';
import { ChatMemberRole } from '../domain/members/enums/chat-member-role.enum';
import { MembersEntity } from '../domain/members/members.entity';
import { ChatsCreateDto } from '../presenter/dto/input/chats-create.dto';
import { ChatResponseDto } from '../presenter/dto/output/chats.dto';
import { ChatProfileApplicationServiceContract } from './contracts/profile-application-service.contract';
import { ChatsApplicationService } from './ports/chats.application.service.port';
import { ChatsRepository } from '../infrastructure/orm/chats/repository/chats.repository.port';
import { MembersRepository } from '../infrastructure/orm/members/repository/member.repository.port';
import { ChatsMapper } from '../infrastructure/orm/chats/mapper/chats.mapper.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsApplicationServiceImpl implements ChatsApplicationService {
  private readonly logger = createLogger(ChatsApplicationServiceImpl.name);

  constructor(
    private readonly profileApplicationService: ChatProfileApplicationServiceContract,
    private readonly chatService: ChatService,
    private readonly chatRepository: ChatsRepository,
    private readonly memberRepository: MembersRepository,
    private readonly chatMapper: ChatsMapper,
    private readonly prismaService: PrismaService,
    private readonly publisher: EventPublisher,
  ) {}

  async createChat(input: ChatsCreateDto): Promise<ChatResponseDto> {
    const { name, ownerProfileId, type } = input;

    const profileIsValid =
      await this.profileApplicationService.validateProfileForChatCreation(
        ownerProfileId,
      );

    if (!profileIsValid) {
      throw ChatErrors.MemberCanNotBeAddedToChat();
    }

    const chat = ChatEntity.create({
      name,
      type,
    });

    const chatMember = MembersEntity.create({
      profileId: ownerProfileId,
      chatId: chat.id,
      role: ChatMemberRole.ADMIN,
    });

    this.chatService.canAddMemberToChat(chat, chatMember);

    // save to the database in transactional manner
    const chatRecord = await this.prismaService.$transaction(async () => {
      const chatRecord = await this.chatRepository.create(chat);
      await this.memberRepository.create(chatMember);
      return chatRecord;
    });

    chat.publishEvents(this.publisher, this.logger);
    chatMember.publishEvents(this.publisher, this.logger);

    return this.chatMapper.toResponse(chatRecord);
  }
}
