import { Prisma } from '@prisma/client';
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
    take: number,
    cursor: string | undefined,
    orderBy: Prisma.LikeOrderByWithRelationInput,
  ): Promise<LikeEntity[]>;
  abstract countReceivedLikesByProfileId(profileId: string): Promise<number>;
}
