import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { ReportEntity } from '@src/modules/interactions/reports/domain/report.entity';
import { ReportDatabaseModel } from '../schema/report.schema';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { ReportMapper } from '../mapper/report.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { ReportRepository } from './report.repository.port';

@Injectable()
export class ReportRepositoryImpl
  extends BaseOrmEntityRepository<ReportEntity, ReportDatabaseModel, 'Report'>
  implements ReportRepository
{
  protected modelName: Prisma.ModelName = 'Report';
  protected prismaService: PrismaService;

  constructor(protected readonly mapper: ReportMapper) {
    super(mapper);
    this.prismaService = new PrismaService(
      createLogger(ReportRepositoryImpl.name),
    );
  }

  async getReportBySourceAndTargetProfiles(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<ReportEntity> {
    return this.prismaService.report
      .findFirst({
        where: {
          sourceProfileId,
          targetProfileId,
        },
      })
      .then((res) => (res ? this.mapper.toDomain(res) : null));
  }
}
