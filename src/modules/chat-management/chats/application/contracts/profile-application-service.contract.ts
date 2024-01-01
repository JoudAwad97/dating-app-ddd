import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

export abstract class ChatProfileApplicationServiceContract {
  abstract validateProfileForChat(profileId: string): Promise<boolean>;
  abstract getProfileByIds(profileIds: string[]): Promise<ProfileResponseDto[]>;
}
