import { PictureStatus } from '@prisma/client';
import { z } from 'zod';

export const ImageDatabaseSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  url: z.string().url(),
  status: z.nativeEnum(PictureStatus),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ImageDatabaseModel = z.TypeOf<typeof ImageDatabaseSchema>;
