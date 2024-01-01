import { DiscoveryProfileApplicationServiceContract } from '@src/modules/discovery/application/contracts/profile-application-service.contract';
import { Injectable } from '@nestjs/common';
import { DiscoveryApplicationService } from './ports/discovery.application.service.port';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { DiscoveryQueryDto } from '../presenter/dto/discovery-query.dto';
import { DiscoveryInteractionApplicationServiceContract } from './contracts/interaction-application-service.contract';

@Injectable()
export class DiscoveryApplicationServiceImpl
  implements DiscoveryApplicationService
{
  constructor(
    private readonly profileApplicationService: DiscoveryProfileApplicationServiceContract,
    private readonly interactionApplicationService: DiscoveryInteractionApplicationServiceContract,
  ) {}

  async getDiscovery(
    input: DiscoveryQueryDto,
  ): Promise<ProfilePaginatedResponseDto> {
    // get all interactions for the profile
    // TODO: CONSIDER ADDING ANOTHER CALL FOR THE DISLIKES
    const interactedProfiles =
      await this.interactionApplicationService.getInteractedProfilesIdForProfile(
        input.profileId,
      );

    // run the discovery feed search (this is just a dummy sql query in this example)
    return this.profileApplicationService.getProfilesFilteredByDiscardedIds(
      interactedProfiles,
      input,
    );
  }
}
