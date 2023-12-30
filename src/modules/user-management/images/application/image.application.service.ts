import { Injectable } from '@nestjs/common';
import { ImageApplicationService } from './ports/image.application.service.port';
import { CreateImageDto } from '../presenter/dto/image-create.dto';
import { ImageResponseDto } from '../presenter/dto/image.dto';
import { ImageMapper } from '../infrastructure/persistence/orm/mapper/image.mapper.port';
import { ImageRepository } from '../infrastructure/persistence/orm/repository/image.repository.port';
import { IMAGES_LIMIT } from './constants';
import { ImageErrors } from '../domain/image.errors';
import { ImageEntity } from '../domain/image.entity';
import { ImageStatus } from '../domain/enums/image.enum';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { DeleteImageDto } from '../presenter/dto/image-delete.dto';

@Injectable()
export class ImageApplicationServiceImpl implements ImageApplicationService {
  private readonly logger = createLogger(ImageApplicationServiceImpl.name);

  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly imageMapper: ImageMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async deleteImage(input: DeleteImageDto): Promise<boolean> {
    const { imageId } = input;

    const image = await this.imageRepository.findById(imageId);

    if (!image) {
      throw ImageErrors.ImageNotFound();
    }

    image.delete();

    image.publishEvents(this.publisher, this.logger);

    return this.imageRepository.delete(imageId);
  }

  async createImage(input: CreateImageDto): Promise<ImageResponseDto> {
    const { profileId, url } = input;

    const imagesCount =
      await this.imageRepository.imagesCountPerProfile(profileId);

    if (imagesCount > IMAGES_LIMIT) {
      throw ImageErrors.ExecutedImageLimit();
    }

    const image = ImageEntity.create({
      profileId,
      url,
      status: ImageStatus.PENDING_VALIDATION,
    });

    const imageCreated = await this.imageRepository.create(image);

    image.publishEvents(this.publisher, this.logger);

    return this.imageMapper.toResponse(imageCreated);
  }
}
