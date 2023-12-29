import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@src/modules/user-management/profile/application/constants';
import { z } from 'zod';

export const ProfileDatabaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  bio: z.string().max(BIO_MAX_LENGTH).nullable().optional(),
  accountId: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ProfileDatabaseModel = z.TypeOf<typeof ProfileDatabaseSchema>;
