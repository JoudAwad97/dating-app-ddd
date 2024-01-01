import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { DiscoveryQueryDto } from '../../presenter/dto/discovery-query.dto';

export abstract class DiscoveryApplicationService {
  abstract getDiscovery(
    input: DiscoveryQueryDto,
  ): Promise<ProfilePaginatedResponseDto>;
}
