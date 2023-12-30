import { EventsHandler } from '@nestjs/cqrs';
import { LikeUpgradedToReciprocatedEvent } from '../../domain/events/like-upgraded-to-reciprocated.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { LikeRepository } from '../../infrastructure/persistence/orm/repository/like.repository.mapper';

@EventsHandler(LikeUpgradedToReciprocatedEvent)
export class LikeUpgradedToReciprocatedEventHandler {
  private readonly logger = createLogger(
    LikeUpgradedToReciprocatedEventHandler.name,
  );

  constructor(private readonly likeRepository: LikeRepository) {}

  async handle(event: LikeUpgradedToReciprocatedEvent) {
    this.logger.log('LikeUpgradedToReciprocatedEventHandler.handle');

    const like = await this.likeRepository.findById(event.id);

    this.logger.log(
      `Publishing notifications to user ${like.getProps().targetProfileId}`,
    );
  }
}
