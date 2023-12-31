import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ReportEntity } from '@src/modules/interactions/reports/domain/report.entity';

export abstract class ReportRepository extends RepositoryPort<ReportEntity> {
  abstract getReportBySourceAndTargetProfiles(
    sourceProfileId: string,
    targetProfileId: string,
  ): Promise<ReportEntity | null>;
}
