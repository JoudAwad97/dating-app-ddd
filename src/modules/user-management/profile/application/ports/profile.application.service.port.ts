import { ProfileApplicationServiceContract } from '@src/modules/interactions/likes/application/contract/profile-application-service.contract';
import { ProfileCreateDto } from '../../presenter/dto/profile-create.dto';
import { ProfileUpdateDto } from '../../presenter/dto/profile-update.dto';
import { ProfileResponseDto } from '../../presenter/dto/profile.dto';
import { Mixin } from 'ts-mixer';
import { ChatProfileApplicationServiceContract } from '@src/modules/chat-management/chats/application/contracts/profile-application-service.contract';

export abstract class ProfileApplicationService extends Mixin(
  ProfileApplicationServiceContract,
  ChatProfileApplicationServiceContract,
) {
  abstract createProfile(input: ProfileCreateDto): Promise<ProfileResponseDto>;
  abstract updateProfile(input: ProfileUpdateDto): Promise<ProfileResponseDto>;
  abstract getProfile(id: string): Promise<ProfileResponseDto>;
}
