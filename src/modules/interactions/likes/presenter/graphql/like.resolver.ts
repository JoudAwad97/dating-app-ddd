import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LikeResponseDto } from '../dto/like.dto';
import { LikeApplicationService } from '../../application/ports/like.application.service.port';
import { CreateLikeDto } from '../dto/like-create.dto';

@Resolver(() => LikeResponseDto)
export class LikeResolver {
  constructor(
    private readonly likeApplicationService: LikeApplicationService,
  ) {}

  @Mutation(() => LikeResponseDto)
  async likeProfile(
    @Args('input') input: CreateLikeDto,
  ): Promise<LikeResponseDto> {
    return this.likeApplicationService.likeAnotherProfile(input);
  }
}
