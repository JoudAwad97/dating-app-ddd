import { NotFoundException } from '@nestjs/common';

export class ProfileErrors {
  static ProfileNotFound(): Error {
    return new NotFoundException('Profile not found');
  }
}
