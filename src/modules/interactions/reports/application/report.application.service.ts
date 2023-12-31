import { Injectable } from '@nestjs/common';
import { ReportApplicationService } from './port/report.application.service.port';
import { ReportMapper } from '../infrastructure/persistence/orm/mapper/report.mapper.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { ReportRepository } from '../infrastructure/persistence/orm/repository/report.repository.port';
import { CreateReportDto } from '../presenter/dto/create-report.dto';
import { ReportResponseDto } from '../presenter/dto/report.dto';
import { ReportErrors } from '../domain/report.errors';
import { ReportEntity } from '../domain/report.entity';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';

@Injectable()
export class ReportApplicationServiceImpl implements ReportApplicationService {
  private readonly logger = createLogger(ReportApplicationServiceImpl.name);

  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly reportMapper: ReportMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async reportProfile(input: CreateReportDto): Promise<ReportResponseDto> {
    this.logger.log('Creating report record...');

    const { sourceProfileId, targetProfileId, reason } = input;

    const existingReport =
      await this.reportRepository.getReportBySourceAndTargetProfiles(
        sourceProfileId,
        targetProfileId,
      );

    if (existingReport) {
      throw ReportErrors.InvalidReport();
    }

    const report = ReportEntity.create({
      reason,
      sourceProfileId,
      targetProfileId,
    });

    const res = await this.reportRepository.create(report);

    report.publishEvents(this.publisher, this.logger);

    return this.reportMapper.toResponse(res);
  }
}
