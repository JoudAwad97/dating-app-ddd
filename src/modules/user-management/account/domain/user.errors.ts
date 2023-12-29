import { BadRequestException } from '@nestjs/common';

export class UserErrors {
  static EmailAlreadyInUse(): Error {
    return new BadRequestException('Email already in use');
  }
}
