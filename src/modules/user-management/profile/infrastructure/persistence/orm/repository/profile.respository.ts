import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';
import { ProfileDatabaseModel } from '../schema/profile.schema';
import { ProfileRepository } from './profile.repository.port';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { Prisma } from '@prisma/client';
import { ProfileMapper } from '../mapper/profile.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

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
    this.prismaService = new PrismaService(
      createLogger(ProfileRepositoryImpl.name),
    );
  }
}
