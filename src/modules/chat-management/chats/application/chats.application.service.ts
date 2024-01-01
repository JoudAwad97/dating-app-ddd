import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ChatEntity } from '../domain/chats/chat.entity';
import { ChatErrors } from '../domain/chats/chat.errors';
import { ChatService } from '../domain/chats/chat.service';
import { ChatMemberRole } from '../domain/members/enums/chat-member-role.enum';
import { MembersEntity } from '../domain/members/members.entity';
import { ChatsCreateDto } from '../presenter/dto/input/chats-create.dto';
import {
  ChatPaginatedResponseDto,
  ChatResponseDto,
} from '../presenter/dto/output/chats.dto';
import { ChatProfileApplicationServiceContract } from './contracts/profile-application-service.contract';
import { ChatsApplicationService } from './ports/chats.application.service.port';
import { ChatsRepository } from '../infrastructure/orm/chats/repository/chats.repository.port';
import { MembersRepository } from '../infrastructure/orm/members/repository/member.repository.port';
import { ChatsMapper } from '../infrastructure/orm/chats/mapper/chats.mapper.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { Injectable } from '@nestjs/common';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import {
  ProfilePaginatedResponseDto,
  ProfileResponseDto,
} from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import paginationBuilder from '@src/libs/utils/pagination.util';
import { AssignMemberToChatDto } from '../presenter/dto/input/assign-member.dto';
import { ChatMembersErrors } from '../domain/members/members.errors';
import { OrderByTypes } from '@src/libs/databases/prisma/pagination.types';
import { ChatQueryDto } from '../presenter/dto/input/paginated-chat.dto';

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

  async getChatsForProfile(
    input: ChatQueryDto,
  ): Promise<ChatPaginatedResponseDto> {
    const { profileId } = input;

    const { take, cursor } = paginationBuilder.getQueryArgs(input);

    const [chats, count] = await Promise.all([
      this.chatRepository.getProfileChats(profileId, {
        take,
        cursor,
        orderBy: {
          id: OrderByTypes.ASC,
        },
      }),
      this.chatRepository.countProfileChats(profileId),
    ]);

    return paginationBuilder.buildPaginationOutputGenerator<ChatResponseDto>(
      chats,
      chats,
      count,
      input,
    );
  }

  async addMemberToChat(
    input: AssignMemberToChatDto,
  ): Promise<ChatResponseDto> {
    const { chatId, profileId, ownerId } = input;

    const [profileIsValid, chat, profileAlreadyInChat, ownerChatMember] =
      await Promise.all([
        this.profileApplicationService.validateProfileForChat(profileId),
        this.chatRepository.findById(chatId),
        this.memberRepository.findByChatIdAndProfileId(chatId, profileId),
        this.memberRepository.findByChatIdAndProfileId(chatId, ownerId),
      ]);

    if (!chat) {
      throw ChatErrors.ChatNotFound();
    }

    if (profileAlreadyInChat) {
      throw ChatMembersErrors.MemberAlreadyInChat();
    }

    if (!profileIsValid) {
      throw ChatErrors.MemberCanNotBeAddedToChat();
    }

    if (!ownerChatMember) {
      throw ChatMembersErrors.ChatOwnerNotFound();
    }

    const chatMember = MembersEntity.create({
      profileId,
      chatId,
      role: ChatMemberRole.MEMBER,
    });

    this.chatService.canAddMemberToChat(chat, ownerChatMember);

    // save to the database
    await this.memberRepository.create(chatMember);

    // we can also add a function to the chat entity that we can call that will store an event
    // and will fire that event later on
    chatMember.publishEvents(this.publisher, this.logger);

    return this.chatMapper.toResponse(chat);
  }

  async getChatMembers(
    chatId: string,
    input: PaginatedQueryRequestDto,
  ): Promise<ProfilePaginatedResponseDto> {
    const { take, cursor } = paginationBuilder.getQueryArgs(input);

    const [members, count] = await Promise.all([
      this.memberRepository.getPaginatedChatMembers(chatId, {
        take,
        cursor,
        orderBy: {
          id: OrderByTypes.ASC,
        },
      }),
      this.memberRepository.countChatMembers(chatId),
    ]);

    const profileIds: string[] = [];
    const membersIds: { id: string }[] = [];

    members.forEach((like) => {
      profileIds.push(like.getProps().profileId);
      membersIds.push({ id: like.getProps().id });
    });

    const data =
      await this.profileApplicationService.getProfileByIds(profileIds);

    return paginationBuilder.buildPaginationOutputGenerator<ProfileResponseDto>(
      data,
      membersIds,
      count,
      input,
    );
  }

  async createChat(input: ChatsCreateDto): Promise<ChatResponseDto> {
    const { name, ownerProfileId, type } = input;

    const profileIsValid =
      await this.profileApplicationService.validateProfileForChat(
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
