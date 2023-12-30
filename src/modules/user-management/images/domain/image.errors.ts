import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IMAGES_LIMIT } from '../application/constants';

export class ImageErrors {
  static ExecutedImageLimit(): Error {
    return new BadRequestException(
      `You can't upload more than ${IMAGES_LIMIT} images`,
    );
  }

  static ImageNotFound(): Error {
    return new NotFoundException(`Image not found`);
  }
}
