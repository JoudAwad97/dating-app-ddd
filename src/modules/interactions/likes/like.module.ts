import { Module, Provider } from '@nestjs/common';
import { LikeInfrastructureModule } from './infrastructure/infrastructure.module';
import { LikeResolver } from './presenter/graphql/like.resolver';
import { LikeApplicationServiceImpl } from './application/like.application.service';
import { LikeApplicationService } from './application/ports/like.application.service.port';

const resolvers: Provider[] = [LikeResolver];
const applicationService: Provider[] = [
  {
    provide: LikeApplicationService,
    useExisting: LikeApplicationServiceImpl,
  },
  LikeApplicationServiceImpl,
];

const eventHandlers: Provider[] = [];

@Module({
  imports: [LikeInfrastructureModule],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
  controllers: [],
  exports: [],
})
export class LikeModule {}
