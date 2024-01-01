import { PaginationParams } from '@src/libs/databases/prisma/pagination.types';
import { RepositoryPort } from '@src/libs/ports/repository.port';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';

export abstract class LikeRepository extends RepositoryPort<LikeEntity> {
  abstract getInteractedProfilesIdForProfile(
    profileId: string,
  ): Promise<string[]>;
  abstract getLikeBySourceAndTargetProfilesByIds(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<LikeEntity | null>;
  abstract getReceivedLikesByProfileId(
    profileId: string,
    paginationParams: PaginationParams,
  ): Promise<LikeEntity[]>;
  abstract countReceivedLikesByProfileId(profileId: string): Promise<number>;
}
