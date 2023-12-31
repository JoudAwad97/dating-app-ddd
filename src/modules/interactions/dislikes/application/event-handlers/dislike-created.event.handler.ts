import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DislikeCreatedEvent } from '../../domain/events/dislike-created.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { DislikeCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/dislike-created.event.integration';

@EventsHandler(DislikeCreatedEvent)
export class DislikeCreatedEventHandler
  implements IEventHandler<DislikeCreatedEvent>
{
  private readonly logger = createLogger(DislikeCreatedEventHandler.name);

  constructor(private readonly publisher: EventPublisher) {}

  handle(event: DislikeCreatedEvent) {
    this.logger.debug(`Publishing a dislike event in the system`);

    const { sourceProfileId, targetProfileId } = event;

    this.publisher.publishIntegrationEvent(
      DislikeCreatedIntegrationEvent.name,
      new DislikeCreatedIntegrationEvent({
        sourceProfileId,
        targetProfileId,
        aggregateId: event.aggregateId,
      }),
    );
  }
}
