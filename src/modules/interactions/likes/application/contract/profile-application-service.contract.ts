import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

export abstract class ProfileApplicationServiceContract {
  abstract getProfileByIds(profileIds: string[]): Promise<ProfileResponseDto[]>;
}
