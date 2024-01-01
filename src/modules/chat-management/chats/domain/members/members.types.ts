import { ChatMemberRole } from './enums/chat-member-role.enum';

export interface ChatMemberProps {
  chatId: string;
  profileId: string;
  role: ChatMemberRole;
}

export interface ChatMemberCreateProps {
  chatId: string;
  profileId: string;
  role: ChatMemberRole;
}
