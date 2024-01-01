import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';
import { MemberMapper } from './member.mapper.port';
import {
  MemberDataSchema,
  MemberDatabaseModel,
} from '../schema/members.schema';
import { ChatMemberRole as ChatMemberDBRole } from '@prisma/client';
import { ChatMemberRole } from '@modules/chat-management/chats/domain/members/enums/chat-member-role.enum';

export class MemberMapperImpl extends MemberMapper {
  constructor() {
    super();
    this.toDomain = this.toDomain.bind(this);
  }

  toPersistence(entity: MembersEntity): MemberDatabaseModel {
    const copy = entity.getProps();
    const record: MemberDatabaseModel = {
      id: copy.id,
      chatId: copy.chatId,
      profileId: copy.profileId,
      role: copy.role,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return MemberDataSchema.parse(record);
  }

  private mapRoleFromPersistenceToDomain(
    role: ChatMemberDBRole,
  ): ChatMemberRole {
    switch (role) {
      case ChatMemberDBRole.ADMIN:
        return ChatMemberRole.ADMIN;
      case ChatMemberDBRole.MEMBER:
        return ChatMemberRole.MEMBER;
      default:
        throw new Error('Invalid role');
    }
  }

  toDomain(record: MemberDatabaseModel): MembersEntity {
    const entity = new MembersEntity({
      id: record.id,
      props: {
        chatId: record.chatId,
        profileId: record.profileId,
        role: this.mapRoleFromPersistenceToDomain(record.role),
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
    return entity;
  }

  toResponse() {
    throw new Error('Method not implemented.');
  }
}
