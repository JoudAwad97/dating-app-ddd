import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DislikeResponseDto } from '../dto/dislike.dto';
import { DislikeApplicationService } from '../../application/port/dislike.application.service.port';
import { CreateDislikeDto } from '../dto/create-dislike.dto';

@Resolver(() => DislikeResponseDto)
export class DislikeResolver {
  constructor(
    private readonly dislikeApplicationService: DislikeApplicationService,
  ) {}

  @Mutation(() => DislikeResponseDto)
  async dislikeProfile(
    @Args('input') input: CreateDislikeDto,
  ): Promise<DislikeResponseDto> {
    return this.dislikeApplicationService.dislikeProfile(input);
  }
}
