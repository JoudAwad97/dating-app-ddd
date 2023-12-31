import {
  REASON_MAX_LENGTH,
  REASON_MIN_LENGTH,
} from '@src/modules/interactions/dislikes/application/constants';
import { z } from 'zod';

export const DislikeDatabaseSchema = z.object({
  id: z.string().uuid(),
  reason: z.string().min(REASON_MIN_LENGTH).max(REASON_MAX_LENGTH),
  sourceProfileId: z.string().uuid(),
  targetProfileId: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type DislikeDatabaseModel = z.TypeOf<typeof DislikeDatabaseSchema>;
