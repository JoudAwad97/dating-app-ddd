import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { ProfilePaginatedResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

export abstract class DiscoveryProfileApplicationServiceContract {
  abstract getProfilesFilteredByDiscardedIds(
    discardedProfileIds: string[],
    input: PaginatedQueryRequestDto,
  ): Promise<ProfilePaginatedResponseDto>;
}
