import { LikeInteractionStatus } from './enums/like-status.enum';

export interface LikeProps {
  sourceProfileId: string;
  targetProfileId: string;
  status: LikeInteractionStatus;
}

export interface LikeCreateProps {
  sourceProfileId: string;
  targetProfileId: string;
}
