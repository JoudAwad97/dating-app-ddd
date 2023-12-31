import { DislikeCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/dislike-created.event.integration';

export abstract class LikeMessageApplicationService {
  abstract handleDislikeCreatedEvent(event: DislikeCreatedIntegrationEvent);
}
