import { DislikeApplicationServiceImpl } from './application/dislike.application.service';
import { Module, Provider } from '@nestjs/common';
import { DislikeInfrastructureModule } from './infrastructure/dislike-infrastructure.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { DislikeResolver } from './presenter/graphql/dislike.resolver';
import { DislikeApplicationService } from './application/port/dislike.application.service.port';
import { DislikeCreatedEventHandler } from './application/event-handlers/dislike-created.event.handler';

const applicationService: Provider[] = [
  {
    provide: DislikeApplicationService,
    useExisting: DislikeApplicationServiceImpl,
  },
  DislikeApplicationServiceImpl,
];

const eventHandlers: Provider[] = [DislikeCreatedEventHandler];

const resolvers: Provider[] = [DislikeResolver];

@Module({
  imports: [PublisherModule, GqlModule, DislikeInfrastructureModule],
  controllers: [],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
  exports: [],
})
export class DislikesModule {}
