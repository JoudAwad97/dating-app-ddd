import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { DiscoveryApplicationService } from '../../application/ports/discovery.application.service.port';
import { DiscoveryQueryDto } from '../dto/discovery-query.dto';

@Resolver()
export class DiscoveryResolver {
  constructor(
    private readonly discoveryApplicationService: DiscoveryApplicationService,
  ) {}

  @Query(() => ProfilePaginatedResponseDto)
  async discovery(
    @Args('input') input: DiscoveryQueryDto,
  ): Promise<ProfilePaginatedResponseDto> {
    return this.discoveryApplicationService.getDiscovery(input);
  }
}
