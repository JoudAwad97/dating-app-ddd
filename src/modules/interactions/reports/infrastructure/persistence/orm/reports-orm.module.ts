import { Module } from '@nestjs/common';
import { ReportMapperImpl } from './mapper/report.mapper';
import { ReportMapper } from './mapper/report.mapper.port';
import { ReportRepository } from './repository/report.repository.port';
import { ReportRepositoryImpl } from './repository/report.repository';

@Module({
  providers: [
    {
      provide: ReportMapper,
      useExisting: ReportMapperImpl,
    },
    {
      provide: ReportRepository,
      useExisting: ReportRepositoryImpl,
    },
    ReportRepositoryImpl,
    ReportMapperImpl,
  ],
  exports: [ReportMapper, ReportRepository],
})
export class ReportsOrmModule {}
