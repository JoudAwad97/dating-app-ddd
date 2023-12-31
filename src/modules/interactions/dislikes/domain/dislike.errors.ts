import { BadGatewayException } from '@nestjs/common';

export class DislikeErrors {
  static InvalidDislikeInteraction(): Error {
    return new BadGatewayException('Invalid dislike');
  }
}
