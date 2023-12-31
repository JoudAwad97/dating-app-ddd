import { Module, Provider } from '@nestjs/common';
import { ReportsInfrastructureModule } from './infrastructure/reports-infrastructure.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { ReportResolver } from './presenter/graphql/report.resolver';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { ReportApplicationService } from './application/port/report.application.service.port';
import { ReportApplicationServiceImpl } from './application/report.application.service';

const resolvers: Provider[] = [ReportResolver];
const applicationService: Provider[] = [
  {
    provide: ReportApplicationService,
    useExisting: ReportApplicationServiceImpl,
  },
  ReportApplicationServiceImpl,
];

const eventHandlers: Provider[] = [];

@Module({
  imports: [ReportsInfrastructureModule, GqlModule, PublisherModule],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
  exports: [],
})
export class ReportsModule {}
