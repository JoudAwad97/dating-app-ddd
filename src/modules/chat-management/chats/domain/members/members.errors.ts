import { ConflictException } from '@nestjs/common';

export class ChatMembersErrors {
  static MissingPermissionsToAddChatMember() {
    return new ConflictException('Missing permissions to add chat member');
  }
}
