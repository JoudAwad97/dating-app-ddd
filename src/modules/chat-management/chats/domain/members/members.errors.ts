import { ConflictException, NotFoundException } from '@nestjs/common';

export class ChatMembersErrors {
  static MissingPermissionsToAddChatMember(): Error {
    return new ConflictException('Missing permissions to add chat member');
  }

  static MemberAlreadyInChat(): Error {
    return new ConflictException('Member already in chat');
  }

  static ChatOwnerNotFound(): Error {
    return new NotFoundException('Chat owner not found');
  }
}
