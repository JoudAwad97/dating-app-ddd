import { z } from 'zod';

export const DislikeDatabaseSchema = z.object({
  id: z.string().uuid(),
  sourceProfileId: z.string().uuid(),
  targetProfileId: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type DislikeDatabaseModel = z.TypeOf<typeof DislikeDatabaseSchema>;
