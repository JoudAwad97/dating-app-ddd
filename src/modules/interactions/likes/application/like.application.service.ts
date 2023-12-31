import { Injectable } from '@nestjs/common';
import { LikeApplicationService } from './ports/like.application.service.port';
import { LikeResponseDto } from '../presenter/dto/like.dto';
import { CreateLikeDto } from '../presenter/dto/like-create.dto';
import { LikeRepository } from '../infrastructure/persistence/orm/repository/like.repository.mapper';
import { LikeMapper } from '../infrastructure/persistence/orm/mapper/like.mapper.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { LikeEntity } from '../domain/like.entity';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { WhoLikesMeDto } from '../presenter/dto/who-likes-me.dto';
import { ProfileApplicationServiceContract } from './contract/profile-application-service.contract';
import paginationBuilder from '@src/libs/utils/pagination.util';
import { LikeMessageApplicationService } from './ports/like-message.application.service.port';
import { DislikeCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/dislike-created.event.integration';

@Injectable()
export class LikeApplicationServiceImpl
  implements LikeApplicationService, LikeMessageApplicationService
{
  private readonly logger = createLogger(LikeApplicationServiceImpl.name);

  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly likeMapper: LikeMapper,
    private readonly publisher: EventPublisher,
    private readonly profileApplicationService: ProfileApplicationServiceContract,
  ) {}

  async handleDislikeCreatedEvent(event: DislikeCreatedIntegrationEvent) {
    // check if there is a dislike between profiles and change the status to "DISCONNECTED"
    const { sourceProfileId, targetProfileId } = event;

    const like =
      await this.likeRepository.getLikeBySourceAndTargetProfilesByIds(
        sourceProfileId,
        targetProfileId,
      );

    if (like) {
      like.updateLikeStatusToDisliked();
      await this.likeRepository.update(like);
    }
  }

  async whoLikesMe(input: WhoLikesMeDto): Promise<ProfilePaginatedResponseDto> {
    const { profileId } = input;

    const { take, cursor } = paginationBuilder.getQueryArgs(input);

    const [likes, count] = await Promise.all([
      this.likeRepository.getReceivedLikesByProfileId(profileId, take, cursor, {
        id: 'asc',
      }),
      this.likeRepository.countReceivedLikesByProfileId(profileId),
    ]);

    const profileIds: string[] = [];
    const likesIds: { id: string }[] = [];

    likes.forEach((like) => {
      profileIds.push(like.getProps().sourceProfileId);
      likesIds.push({ id: like.getProps().id });
    });

    const data =
      await this.profileApplicationService.getProfileByIds(profileIds);

    return paginationBuilder.buildPaginationOutputGenerator(
      data,
      likesIds,
      count,
      input,
    );
  }

  async likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto> {
    const { sourceProfileId, targetProfileId } = input;

    const like =
      await this.likeRepository.getLikeBySourceAndTargetProfilesByIds(
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
