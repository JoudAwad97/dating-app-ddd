import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReportCreatedEvent } from '../../domain/event/report-created.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { ReportCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/report-created.event.integration';

@EventsHandler(ReportCreatedEvent)
export class ReportCreatedEventHandler
  implements IEventHandler<ReportCreatedEvent>
{
  private readonly logger = createLogger(ReportCreatedEventHandler.name);

  constructor(private readonly publisher: EventPublisher) {}

  handle(event: ReportCreatedEvent) {
    this.logger.log('ReportCreatedEventHandler.handle');

    const { aggregateId, sourceProfileId, targetProfileId } = event;

    this.logger.log(`Publishing Integration Event for ReportCreatedEvent...`);

    this.publisher.publishIntegrationEvent(
      ReportCreatedIntegrationEvent.name,
      new ReportCreatedIntegrationEvent({
        aggregateId,
        sourceProfileId,
        targetProfileId,
      }),
    );
  }
}
