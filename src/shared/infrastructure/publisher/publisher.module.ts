import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { generateRabbitMQConfigurations } from './publisher.utils';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { EventPublisherImpl } from './publisher';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          ...generateRabbitMQConfigurations(),
        },
      ],
    }),
    CqrsModule,
  ],
  providers: [
    {
      provide: EventPublisher,
      useExisting: EventPublisherImpl,
    },
    EventPublisherImpl,
  ],
  exports: [EventPublisher],
})
export class PublisherModule {}
