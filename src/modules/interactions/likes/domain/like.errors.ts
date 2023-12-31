import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';

export class LikeErrors {
  static LikeIsAlreadyReciprocated(): Error {
    return new ConflictException('Like is already reciprocated');
  }

  static LikeIsAlreadyDisliked(): Error {
    return new ConflictException('Like is already disliked');
  }

  static InvalidLikeInteraction(): Error {
    return new BadRequestException('Invalid like interaction');
  }

  static CanNotLikeYourself(): Error {
    return new ForbiddenException('Can not like yourself');
  }
}
