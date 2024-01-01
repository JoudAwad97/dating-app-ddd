import { ChatStatus, ChatTypes } from '@prisma/client';
import {
  CHAT_MAX_NAME_LENGTH,
  CHAT_MIN_NAME_LENGTH,
} from '@src/modules/chat-management/chats/application/constants';
import { z } from 'zod';

export const ChatDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(CHAT_MIN_NAME_LENGTH).max(CHAT_MAX_NAME_LENGTH),
  type: z.nativeEnum(ChatTypes),
  status: z.nativeEnum(ChatStatus),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ChatDatabaseModel = z.TypeOf<typeof ChatDataSchema>;
