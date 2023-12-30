import { BadRequestException } from '@nestjs/common';

export class LikeErrors {
  static LikeIsAlreadyReciprocated(): Error {
    return new BadRequestException('Like is already reciprocated');
  }

  static InvalidLikeInteraction(): Error {
    return new BadRequestException('Invalid like interaction');
  }

  static CanNotLikeYourself(): Error {
    return new BadRequestException('Can not like yourself');
  }
}
