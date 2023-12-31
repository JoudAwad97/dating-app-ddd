import { Injectable } from '@nestjs/common';
import { DislikeApplicationService } from './port/dislike.application.service.port';
import { DislikeResponseDto } from '../presenter/dto/dislike.dto';
import { CreateDislikeDto } from '../presenter/dto/create-dislike.dto';
import { DislikeRepository } from '../infrastructure/persistence/orm/repository/dislike.repository.port';
import { DislikeMapper } from '../infrastructure/persistence/orm/mapper/dislike.mapper.port';
import { DislikeEntity } from '../domain/dislike.entity';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';

@Injectable()
export class DislikeApplicationServiceImpl
  implements DislikeApplicationService
{
  private readonly logger = createLogger(DislikeApplicationServiceImpl.name);

  constructor(
    private readonly dislikeRepository: DislikeRepository,
    private readonly dislikeMapper: DislikeMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async dislikeProfile(input: CreateDislikeDto): Promise<DislikeResponseDto> {
    const { sourceProfileId, targetProfileId } = input;

    const dislike = await this.dislikeRepository.findDislikeBetweenProfiles(
      sourceProfileId,
      targetProfileId,
    );

    if (dislike) {
      dislike.canCreateNewDislikeBetweenProfiles();
    }

    // create dislike record and publish event
    const newDislike = DislikeEntity.create(input);

    const createdDislike = await this.dislikeRepository.create(newDislike);

    newDislike.publishEvents(this.publisher, this.logger);

    return this.dislikeMapper.toResponse(createdDislike);
  }
}
