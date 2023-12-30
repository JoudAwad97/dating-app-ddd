import { Injectable } from '@nestjs/common';
import { LikeApplicationService } from './ports/like.application.service.port';
import { LikeResponseDto } from '../presenter/dto/like.dto';
import { CreateLikeDto } from '../presenter/dto/like-create.dto';
import { LikeRepository } from '../infrastructure/persistence/orm/repository/like.repository.mapper';
import { LikeMapper } from '../infrastructure/persistence/orm/mapper/like.mapper.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { LikeEntity } from '../domain/like.entity';

@Injectable()
export class LikeApplicationServiceImpl implements LikeApplicationService {
  private readonly logger = createLogger(LikeApplicationServiceImpl.name);

  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly likeMapper: LikeMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto> {
    const { sourceProfileId, targetProfileId } = input;

    const like = await this.likeRepository.getLikeBySourceAndTargetProfileIds(
      sourceProfileId,
      targetProfileId,
    );

    // if we have a like then convert it into a reciprocated like
    if (like) {
      like.upgradeToReciprocatedLike(sourceProfileId, targetProfileId);

      await this.likeRepository.update(like);

      like.publishEvents(this.publisher, this.logger);

      return this.likeMapper.toResponse(like);
    }

    // if no like if found then keep going with the creation of a new like
    const newLike = LikeEntity.create(input);

    newLike.canCreateLike();
    const res = await this.likeRepository.create(newLike);
    newLike.publishEvents(this.publisher, this.logger);

    return this.likeMapper.toResponse(res);
  }
}
