import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserErrors {
  static EmailAlreadyInUse(): Error {
    return new BadRequestException('Email already in use');
  }

  static AccountNotFound(): Error {
    return new NotFoundException('Account not found with provided Id');
  }
}
