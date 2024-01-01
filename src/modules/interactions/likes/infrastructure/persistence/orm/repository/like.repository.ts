import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';
import { LikeDatabaseModel } from '../schema/like.schema';
import { LikeRepository } from './like.repository.port';
import { InteractionStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { LikeMapper } from '../mapper/like.mapper.port';
import {
  OrderByTypes,
  PaginationParams,
} from '@src/libs/databases/prisma/pagination.types';

@Injectable()
export class LikeRepositoryImpl
  extends BaseOrmEntityRepository<LikeEntity, LikeDatabaseModel, 'Like'>
  implements LikeRepository
{
  protected modelName: Prisma.ModelName = 'Like';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: LikeMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }

  async getInteractedProfilesIdForProfile(
    profileId: string,
  ): Promise<string[]> {
    const likes = await this.prismaService.like.findMany({
      where: {
        OR: [
          {
            sourceProfileId: profileId,
          },
          {
            targetProfileId: profileId,
          },
        ],
      },
    });

    return likes.map((like) => {
      if (like.sourceProfileId === profileId) {
        return like.targetProfileId;
      } else {
        return like.sourceProfileId;
      }
    });
  }

  async countReceivedLikesByProfileId(profileId: string): Promise<number> {
    return this.prismaService.like.count({
      where: {
        targetProfileId: profileId,
        status: InteractionStatus.SENT,
      },
    });
  }

  async getReceivedLikesByProfileId(
    profileId: string,
    { take = 20, cursor, orderBy = { id: OrderByTypes.ASC } }: PaginationParams,
  ): Promise<LikeEntity[]> {
    return this.prismaService.like
      .findMany({
        take,
        skip: cursor ? 1 : 0,
        where: {
          targetProfileId: profileId,
          status: InteractionStatus.SENT,
        },
        orderBy,
        cursor: cursor ? { id: cursor } : undefined,
      })
      .then((res) => res.map((like) => this.mapper.toDomain(like)));
  }

  async getLikeBySourceAndTargetProfilesByIds(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<LikeEntity> {
    return this.prismaService.like
      .findFirst({
        where: {
          OR: [
            {
              sourceProfileId: sourceProfileId,
              targetProfileId: targetProfileId,
            },
            {
              sourceProfileId: targetProfileId,
              targetProfileId: sourceProfileId,
            },
          ],
        },
      })
      .then((res) => (res ? this.mapper.toDomain(res) : null));
  }
}
