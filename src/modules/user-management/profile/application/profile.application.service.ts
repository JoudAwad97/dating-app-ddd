import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { ProfileCreateDto } from '../presenter/dto/profile-create.dto';
import { ProfileResponseDto } from '../presenter/dto/profile.dto';
import { ProfileApplicationService } from './ports/profile.application.service.port';
import { ProfileEntity } from '../domain/profile.entity';
import { ProfileRepository } from '../infrastructure/persistence/orm/repository/profile.repository.port';
import { ProfileMapper } from '../infrastructure/persistence/orm/mapper/profile.mapper.port';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { Injectable } from '@nestjs/common';
import { ProfileUpdateDto } from '../presenter/dto/profile-update.dto';
import { ProfileErrors } from '../domain/profile.errors';

@Injectable()
export class ProfileApplicationServiceImpl
  implements ProfileApplicationService
{
  private readonly logger = createLogger(ProfileApplicationServiceImpl.name);

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileMapper: ProfileMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async validateProfileForChat(profileId: string): Promise<boolean> {
    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw ProfileErrors.ProfileNotFound();
    }

    // consider adding more validation in here, like checking for profile status, etc...
    // or adding more logic to the profile entity to check for this

    return true;
  }

  getProfileByIds(profileIds: string[]): Promise<ProfileResponseDto[]> {
    return this.profileRepository.getProfilesByIds(profileIds);
  }

  async getProfile(id: string): Promise<ProfileResponseDto> {
    this.logger.log(`ProfileApplicationServiceImpl.getProfile`);

    return this.profileRepository
      .findById(id)
      .then((profile) => this.profileMapper.toResponse(profile));
  }

  async updateProfile(input: ProfileUpdateDto): Promise<ProfileResponseDto> {
    this.logger.log(`ProfileApplicationServiceImpl.updateProfile`);

    const { profileId, bio, name } = input;

    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw ProfileErrors.ProfileNotFound();
    }

    if (bio !== null) {
      profile.updateBio(bio);
    }
    profile.updateName(name);

    const res = await this.profileRepository.update(profile);

    profile.publishEvents(this.publisher, this.logger);

    return this.profileMapper.toResponse(res);
  }

  async createProfile(input: ProfileCreateDto): Promise<ProfileResponseDto> {
    this.logger.log('ProfileApplicationServiceImpl.createProfile');

    const { name, bio, accountId } = input;

    const profile = ProfileEntity.create({
      name,
      bio,
      accountId,
    });

    const res = await this.profileRepository.create(profile);

    profile.publishEvents(this.publisher, this.logger);

    return this.profileMapper.toResponse(res);
  }
}
