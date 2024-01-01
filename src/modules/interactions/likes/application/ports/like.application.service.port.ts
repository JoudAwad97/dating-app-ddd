import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { CreateLikeDto } from '../../presenter/dto/like-create.dto';
import { LikeResponseDto } from '../../presenter/dto/like.dto';
import { WhoLikesMeDto } from '../../presenter/dto/who-likes-me.dto';
import { DiscoveryInteractionApplicationServiceContract } from '@src/modules/discovery/application/contracts/interaction-application-service.contract';

export abstract class LikeApplicationService extends DiscoveryInteractionApplicationServiceContract {
  abstract likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto>;
  abstract whoLikesMe(
    input: WhoLikesMeDto,
  ): Promise<ProfilePaginatedResponseDto>;
}
