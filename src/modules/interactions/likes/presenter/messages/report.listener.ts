import { Controller, Logger } from '@nestjs/common';
import { LikeMessageApplicationService } from '../../application/ports/like-message.application.service.port';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ackMessage } from '@src/libs/utils/rabbitmq.util';
import { ReportCreatedIntegrationEvent } from '@src/shared/infrastructure/publisher/integration-events/report-created.event.integration';

@Controller()
export class ReportListener {
  private readonly logger = new Logger(ReportListener.name);

  constructor(
    private readonly likeMessageApplicationService: LikeMessageApplicationService,
  ) {}

  @EventPattern(ReportCreatedIntegrationEvent.name)
  async handleDislikeCreatedEvent(
    @Payload() event: ReportCreatedIntegrationEvent,
    @Ctx() context: RmqContext,
  ) {
    this.logger.debug(`Handling a ${ReportCreatedIntegrationEvent.name} event`);

    await this.likeMessageApplicationService.handleDislikeCreatedEvent(event);
    ackMessage(context);
  }
}
