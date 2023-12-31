import { Module, Provider } from '@nestjs/common';
import { LikeInfrastructureModule } from './infrastructure/infrastructure.module';
import { LikeResolver } from './presenter/graphql/like.resolver';
import { LikeApplicationServiceImpl } from './application/like.application.service';
import { LikeApplicationService } from './application/ports/like.application.service.port';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { LikeUpgradedToReciprocatedEventHandler } from './application/event-handlers/like-upgraded-to-reciprocated.event';
import { LikeInteractionEventHandler } from './application/event-handlers/like-created.event';
import { ProfileModule } from '@src/modules/user-management/profile/profile.module';
import { LikeMessageApplicationService } from './application/ports/like-message.application.service.port';
import { LikeListener } from './presenter/messages/like.listener';
import { ReportListener } from './presenter/messages/report.listener';

const resolvers: Provider[] = [LikeResolver];
const applicationService: Provider[] = [
  {
    provide: LikeApplicationService,
    useExisting: LikeApplicationServiceImpl,
  },
  {
    // consider using a different "Application service" for this port
    provide: LikeMessageApplicationService,
    useExisting: LikeApplicationService,
  },
  LikeApplicationServiceImpl,
];

const eventHandlers: Provider[] = [
  LikeUpgradedToReciprocatedEventHandler,
  LikeInteractionEventHandler,
];

const externalModules = [ProfileModule];
const listeners = [LikeListener, ReportListener];

@Module({
  imports: [
    PublisherModule,
    GqlModule,
    LikeInfrastructureModule,
    ...externalModules,
  ],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
  controllers: [...listeners],
  exports: [],
})
export class LikeModule {}
