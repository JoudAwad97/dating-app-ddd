import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { CreateLikeDto } from '../../presenter/dto/like-create.dto';
import { LikeResponseDto } from '../../presenter/dto/like.dto';
import { WhoLikesMeDto } from '../../presenter/dto/who-likes-me.dto';

export abstract class LikeApplicationService {
  abstract likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto>;
  abstract whoLikesMe(
    input: WhoLikesMeDto,
  ): Promise<ProfilePaginatedResponseDto>;
}
