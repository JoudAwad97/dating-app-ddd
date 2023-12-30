import { RepositoryPort } from '@src/libs/ports/repository.port';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';

export abstract class LikeRepository extends RepositoryPort<LikeEntity> {
  abstract getLikeBySourceAndTargetProfileIds(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<LikeEntity | null>;
}