import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImageCreatedEvent } from '../../domain/events/image-created.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { ImageRepository } from '../../infrastructure/persistence/orm/repository/image.repository.port';
import { ImageStatus } from '../../domain/enums/image.enum';

@EventsHandler(ImageCreatedEvent)
export class ImageCreatedEventHandler
  implements IEventHandler<ImageCreatedEvent>
{
  private readonly logger = createLogger(ImageCreatedEventHandler.name);

  constructor(private readonly imageRepository: ImageRepository) {}

  async handle(event: ImageCreatedEvent) {
    this.logger.log('ImageCreatedEventHandler.handle');
    this.logger.log(`Validating Image with id: ${event.imageId}`);

    const { imageId } = event;

    const image = await this.imageRepository.findById(imageId);

    image.updateStatus(ImageStatus.ACTIVE);

    await this.imageRepository.update(image);
  }
}
