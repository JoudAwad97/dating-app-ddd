import { ChatStatus } from './enums/chat-status.enum';
import { ChatTypes } from './enums/chat-type.enum';

export interface ChatProps {
  type: ChatTypes;
  status: ChatStatus;
  name: string;
}

export interface ChatCreateProps {
  type: ChatTypes;
  name: string;
}
