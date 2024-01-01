import { ChatMemberRole } from '@prisma/client';
import { z } from 'zod';

export const MemberDataSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  profileId: z.string().uuid(),
  role: z.nativeEnum(ChatMemberRole),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type MemberDatabaseModel = z.TypeOf<typeof MemberDataSchema>;
