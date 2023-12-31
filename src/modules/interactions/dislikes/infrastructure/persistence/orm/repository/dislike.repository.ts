import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { DislikeEntity } from '@src/modules/interactions/dislikes/domain/dislike.entity';
import { DislikeDatabaseModel } from '../schema/dislike.schema';
import { DislikeRepository } from './dislike.repository.port';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { DislikeMapper } from '../mapper/dislike.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

@Injectable()
export class DislikeRepositoryImpl
  extends BaseOrmEntityRepository<
    DislikeEntity,
    DislikeDatabaseModel,
    'Dislike'
  >
  implements DislikeRepository
{
  protected modelName: Prisma.ModelName = 'Dislike';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: DislikeMapper) {
    super(mapper);
    this.prismaService = new PrismaService(
      createLogger(DislikeRepositoryImpl.name),
    );
  }

  async findDislikeBetweenProfiles(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<DislikeEntity | null> {
    return this.prismaService.dislike
      .findFirst({
        where: {
          OR: [
            {
              sourceProfileId,
              targetProfileId,
            },
            {
              targetProfileId: sourceProfileId,
              sourceProfileId: targetProfileId,
            },
          ],
        },
      })
      .then((res) => (res ? this.mapper.toDomain(res) : null));
  }
}
