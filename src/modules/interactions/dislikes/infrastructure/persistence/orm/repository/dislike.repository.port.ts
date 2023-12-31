import { RepositoryPort } from '@src/libs/ports/repository.port';
import { DislikeEntity } from '@src/modules/interactions/dislikes/domain/dislike.entity';

export abstract class DislikeRepository extends RepositoryPort<DislikeEntity> {}
