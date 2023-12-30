import { registerEnumType } from '@nestjs/graphql';

export enum ImageStatus {
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(ImageStatus, {
  name: 'ImageStatus',
  description: 'Image status',
});
