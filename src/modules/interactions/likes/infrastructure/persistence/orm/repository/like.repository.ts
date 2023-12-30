import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';
import { LikeDatabaseModel } from '../schema/like.schema';
import { LikeRepository } from './like.repository.mapper';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { LikeMapper } from '../mapper/like.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

@Injectable()
export class LikeRepositoryImpl
  extends BaseOrmEntityRepository<LikeEntity, LikeDatabaseModel, 'Like'>
  implements LikeRepository
{
  protected modelName: Prisma.ModelName = 'Like';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: LikeMapper) {
    super(mapper);
    this.prismaService = new PrismaService(
      createLogger(LikeRepositoryImpl.name),
    );
  }

  async getLikeBySourceAndTargetProfileIds(
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
