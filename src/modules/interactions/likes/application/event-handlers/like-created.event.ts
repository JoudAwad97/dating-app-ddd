import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { LikeInteractionEvent } from '../../domain/events/like-interaction-created.event';

@EventsHandler(LikeInteractionEvent)
export class LikeInteractionEventHandler
  implements IEventHandler<LikeInteractionEvent>
{
  private readonly logger = createLogger(LikeInteractionEventHandler.name);

  async handle() {
    this.logger.log('LikeUpgradedToReciprocatedEventHandler.handle');

    this.logger.log(`doing something with the event`);
  }
}
