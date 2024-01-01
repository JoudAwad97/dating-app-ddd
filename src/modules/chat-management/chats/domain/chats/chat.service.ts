import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { MembersEntity } from '../members/members.entity';

@Injectable()
export class ChatService {
  canAddMemberToChat(
    chat: ChatEntity,
    memberWhoIsAddingOtherToChat: MembersEntity,
  ) {
    chat.canChatAcceptNewMembers();
    memberWhoIsAddingOtherToChat.chatMemberCanAddMembersToChat();
  }
}
