import { Controller, Logger } from '@nestjs/common';
import { LikeMessageApplicationService } from '../../application/ports/like-message.application.service.port';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DislikeCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/dislike-created.event.integration';
import { ackMessage } from '@src/libs/utils/rabbitmq.util';

@Controller()
export class LikeListener {
  private readonly logger = new Logger(LikeListener.name);

  constructor(
    private readonly likeMessageApplicationService: LikeMessageApplicationService,
  ) {}

  @EventPattern(DislikeCreatedIntegrationEvent.name)
  async handleDislikeCreatedEvent(
    @Payload() event: DislikeCreatedIntegrationEvent,
    @Ctx() context: RmqContext,
  ) {
    this.logger.debug(
      `Handling a ${DislikeCreatedIntegrationEvent.name} event`,
    );

    await this.likeMessageApplicationService.handleDislikeCreatedEvent(event);
    ackMessage(context);
  }
}
