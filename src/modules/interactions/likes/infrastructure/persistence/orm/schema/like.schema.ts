import { InteractionStatus } from '@prisma/client';
import { z } from 'zod';

export const LikeDatabaseSchema = z.object({
  id: z.string().uuid(),
  sourceProfileId: z.string().uuid(),
  targetProfileId: z.string().uuid(),
  status: z.nativeEnum(InteractionStatus),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type LikeDatabaseModel = z.TypeOf<typeof LikeDatabaseSchema>;
