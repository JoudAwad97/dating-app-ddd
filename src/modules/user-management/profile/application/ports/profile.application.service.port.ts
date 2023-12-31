import { ProfileApplicationServiceContract } from '@src/modules/interactions/likes/application/contract/profile-application-service.contract';
import { ProfileCreateDto } from '../../presenter/dto/profile-create.dto';
import { ProfileUpdateDto } from '../../presenter/dto/profile-update.dto';
import { ProfileResponseDto } from '../../presenter/dto/profile.dto';

export abstract class ProfileApplicationService extends ProfileApplicationServiceContract {
  abstract createProfile(input: ProfileCreateDto): Promise<ProfileResponseDto>;
  abstract updateProfile(input: ProfileUpdateDto): Promise<ProfileResponseDto>;
  abstract getProfile(id: string): Promise<ProfileResponseDto>;
}
