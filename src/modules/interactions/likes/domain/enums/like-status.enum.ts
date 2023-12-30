import { registerEnumType } from '@nestjs/graphql';

export enum LikeInteractionStatus {
  SENT = 'SENT',
  RECIPROCATED = 'RECIPROCATED',
}

registerEnumType(LikeInteractionStatus, {
  name: 'LikeInteractionStatus',
  description: 'Like interaction status',
});
