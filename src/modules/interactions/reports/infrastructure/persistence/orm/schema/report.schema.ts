import {
  REASON_MAX_LENGTH,
  REASON_MIN_LENGTH,
} from '@src/modules/interactions/reports/application/constants';
import { z } from 'zod';

export const ReportDatabaseSchema = z.object({
  id: z.string().uuid(),
  sourceProfileId: z.string().uuid(),
  targetProfileId: z.string().uuid(),
  reason: z.string().min(REASON_MIN_LENGTH).max(REASON_MAX_LENGTH),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ReportDatabaseModel = z.TypeOf<typeof ReportDatabaseSchema>;
