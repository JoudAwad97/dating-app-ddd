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

const resolvers: Provider[] = [LikeResolver];
const applicationService: Provider[] = [
  {
    provide: LikeApplicationService,
    useExisting: LikeApplicationServiceImpl,
  },
  LikeApplicationServiceImpl,
];

const eventHandlers: Provider[] = [
  LikeUpgradedToReciprocatedEventHandler,
  LikeInteractionEventHandler,
];

const externalModules = [ProfileModule];

@Module({
  imports: [
    PublisherModule,
    GqlModule,
    LikeInfrastructureModule,
    ...externalModules,
  ],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
  controllers: [],
  exports: [],
})
export class LikeModule {}
