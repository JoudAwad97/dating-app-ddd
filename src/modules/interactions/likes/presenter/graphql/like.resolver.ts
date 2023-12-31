import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeResponseDto } from '../dto/like.dto';
import { LikeApplicationService } from '../../application/ports/like.application.service.port';
import { CreateLikeDto } from '../dto/like-create.dto';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { WhoLikesMeDto } from '../dto/who-likes-me.dto';

@Resolver(() => LikeResponseDto)
export class LikeResolver {
  constructor(
    private readonly likeApplicationService: LikeApplicationService,
  ) {}

  @Query(() => ProfilePaginatedResponseDto)
  async whoLikesMe(
    @Args('input') input: WhoLikesMeDto,
  ): Promise<ProfilePaginatedResponseDto> {
    return this.likeApplicationService.whoLikesMe(input);
  }

  @Mutation(() => LikeResponseDto)
  async likeProfile(
    @Args('input') input: CreateLikeDto,
  ): Promise<LikeResponseDto> {
    return this.likeApplicationService.likeAnotherProfile(input);
  }
}
