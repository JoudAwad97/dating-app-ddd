import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './../../../../application/constants/validation';
import { z } from 'zod';

export const AccountDatabaseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().max(EMAIL_MAX_LENGTH),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type AccountDatabaseModel = z.TypeOf<typeof AccountDatabaseSchema>;
