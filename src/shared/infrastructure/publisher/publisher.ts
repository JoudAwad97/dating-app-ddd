import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { IntegrationEvent } from '@src/libs/application/integration/integration-event.base';
import { DomainEvent } from '@src/libs/ddd';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { RABBITMQ_INJECTION_NAME } from './publisher.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventPublisherImpl implements EventPublisher {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(RABBITMQ_INJECTION_NAME) private readonly client: ClientProxy,
  ) {}

  publishDomainEvent(eventPayload: DomainEvent): void {
    return this.eventBus.publish(eventPayload);
  }

  publishIntegrationEvent(
    eventName: string,
    eventPayload: IntegrationEvent,
  ): void {
    this.client.emit(eventName, eventPayload);
  }
}
