import { registerEnumType } from '@nestjs/graphql';

export enum LikeInteractionStatus {
  SENT = 'SENT',
  RECIPROCATED = 'RECIPROCATED',
  DISLIKED = 'DISLIKED',
}

registerEnumType(LikeInteractionStatus, {
  name: 'LikeInteractionStatus',
  description: 'Like interaction status',
});
