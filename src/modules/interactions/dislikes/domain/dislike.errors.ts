import { BadRequestException } from '@nestjs/common';

export class DislikeErrors {
  static InvalidDislikeInteraction(): Error {
    return new BadRequestException('Invalid dislike');
  }

  static CanNotCreateNewDislikeBetweenProfiles(): Error {
    return new BadRequestException(
      'Can not create new dislike between profiles',
    );
  }
}
