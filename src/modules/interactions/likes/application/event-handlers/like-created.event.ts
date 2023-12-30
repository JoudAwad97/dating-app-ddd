import { EventsHandler } from '@nestjs/cqrs';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { LikeRepository } from '../../infrastructure/persistence/orm/repository/like.repository.mapper';
import { LikeInteractionEvent } from '../../domain/events/like-interaction-created.event';

@EventsHandler(LikeInteractionEvent)
export class LikeInteractionEventHandler {
  private readonly logger = createLogger(LikeInteractionEventHandler.name);

  constructor(private readonly likeRepository: LikeRepository) {}

  async handle() {
    this.logger.log('LikeUpgradedToReciprocatedEventHandler.handle');

    this.logger.log(`doing something with the event`);
  }
}
