import { ConflictException, NotFoundException } from '@nestjs/common';

export class ChatErrors {
  static MemberCanNotBeAddedToChat(): Error {
    return new ConflictException('Member can not be added to chat');
  }

  static ChatNotFound(): Error {
    return new NotFoundException('Chat not found');
  }
}
