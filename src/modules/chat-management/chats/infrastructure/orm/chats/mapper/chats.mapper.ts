import { Injectable } from '@nestjs/common';
import { ChatsMapper } from './chats.mapper.port';
import { ChatEntity } from '@src/modules/chat-management/chats/domain/chats/chat.entity';
import { ChatResponseDto } from '@src/modules/chat-management/chats/presenter/dto/output/chats.dto';
import { ChatDataSchema, ChatDatabaseModel } from '../schema/chat.schema';
import { ChatStatus } from '@src/modules/chat-management/chats/domain/chats/enums/chat-status.enum';
import { ChatTypes } from '@src/modules/chat-management/chats/domain/chats/enums/chat-type.enum';
import {
  ChatTypes as ChatDBTypes,
  ChatStatus as ChatDBStatus,
} from '@prisma/client';

@Injectable()
export class ChatsMapperImpl extends ChatsMapper {
  constructor() {
    super();
    this.toDomain = this.toDomain.bind(this);
    this.mapPersistenceToResponse = this.mapPersistenceToResponse.bind(this);
  }

  mapPersistenceToResponse(record: ChatDatabaseModel): ChatResponseDto {
    const props = record;
    const response = new ChatResponseDto({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
    response.name = props.name;
    response.status = this.mapChatStatusFromDatabaseToDomain(props.status);
    response.type = this.mapChatTypeFromDatabaseToDomain(props.type);
    return response;
  }

  toPersistence(entity: ChatEntity): ChatDatabaseModel {
    const copy = entity.getProps();
    const record: ChatDatabaseModel = {
      id: copy.id,
      name: copy.name,
      status: copy.status,
      type: copy.type,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return ChatDataSchema.parse(record);
  }

  private mapChatStatusFromDatabaseToDomain(status: ChatDBStatus): ChatStatus {
    switch (status) {
      case ChatDBStatus.ACTIVE:
        return ChatStatus.ACTIVE;
      case ChatDBStatus.INACTIVE:
        return ChatStatus.INACTIVE;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  private mapChatTypeFromDatabaseToDomain(type: ChatDBTypes): ChatTypes {
    switch (type) {
      case ChatDBTypes.PRIVATE:
        return ChatTypes.PRIVATE;
      case ChatDBTypes.GROUP:
        return ChatTypes.GROUP;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }

  toDomain(record: ChatDatabaseModel): ChatEntity {
    const chat = new ChatEntity({
      id: record.id,
      props: {
        name: record.name,
        status: this.mapChatStatusFromDatabaseToDomain(record.status),
        type: this.mapChatTypeFromDatabaseToDomain(record.type),
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return chat;
  }

  toResponse(entity: ChatEntity): ChatResponseDto {
    const props = entity.getProps();
    const response = new ChatResponseDto({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    response.name = props.name;
    response.status = props.status;
    response.type = props.type;
    return response;
  }
}
