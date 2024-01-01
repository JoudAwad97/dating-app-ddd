import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';
import { ProfileDatabaseModel } from '../schema/profile.schema';
import { ProfileRepository } from './profile.repository.port';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { Prisma } from '@prisma/client';
import { ProfileMapper } from '../mapper/profile.mapper.port';
import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

@Injectable()
export class ProfileRepositoryImpl
  extends BaseOrmEntityRepository<
    ProfileEntity,
    ProfileDatabaseModel,
    'Profile'
  >
  implements ProfileRepository
{
  protected modelName: Prisma.ModelName = 'Profile';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: ProfileMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }

  async countProfileFilteredByDiscardedIds(ids: string[]): Promise<number> {
    return this.prismaService.profile.count({
      where: {
        id: {
          notIn: ids,
        },
      },
    });
  }

  async getProfilesFilteredByDiscardedIds(
    ids: string[],
    take: number = 20,
    cursor: string | undefined,
    orderBy: Prisma.ProfileOrderByWithRelationInput = { id: 'asc' },
  ): Promise<ProfileResponseDto[]> {
    return this.prismaService.profile
      .findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take,
        skip: cursor ? 1 : undefined,
        where: {
          id: {
            notIn: ids,
          },
        },
        orderBy,
      })
      .then((res) => res.map(this.mapper.toResponseFromPersistence));
  }

  async getProfilesByIds(ids: string[]): Promise<ProfileResponseDto[]> {
    return this.prismaService.profile
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((res) => res.map(this.mapper.toResponseFromPersistence));
  }
}
