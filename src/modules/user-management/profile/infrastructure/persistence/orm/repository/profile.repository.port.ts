import { PaginationParams } from '@src/libs/databases/prisma/pagination.types';
import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';
import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

export abstract class ProfileRepository extends RepositoryPort<ProfileEntity> {
  abstract getProfilesByIds(ids: string[]): Promise<ProfileResponseDto[]>;
  abstract getProfilesFilteredByDiscardedIds(
    ids: string[],
    paginationParams: PaginationParams,
  ): Promise<ProfileResponseDto[]>;
  abstract countProfileFilteredByDiscardedIds(ids: string[]): Promise<number>;
}
