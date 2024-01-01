import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ImageEntity } from '@src/modules/user-management/images/domain/image.entity';
import { ImageDatabaseModel } from '../schema/image.schema';
import { ImageRepository } from './image.repository.port';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ImageMapper } from '../mapper/image.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

@Injectable()
export class ImageRepositoryImpl
  extends BaseOrmEntityRepository<ImageEntity, ImageDatabaseModel, 'Picture'>
  implements ImageRepository
{
  protected modelName: Prisma.ModelName = 'Picture';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: ImageMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }

  async imagesCountPerProfile(profileId: string): Promise<number> {
    return this.prismaService.picture.count({
      where: {
        profileId,
      },
    });
  }

  async imagesForProfile(profileId: string): Promise<ImageEntity[]> {
    return this.prismaService.picture
      .findMany({
        where: {
          profileId,
        },
      })
      .then((res) => res.map((image) => this.mapper.toDomain(image)));
  }
}
