import { Module, Provider } from '@nestjs/common';
import { DiscoveryApplicationServiceImpl } from './application/discovery.application.service';
import { DiscoveryApplicationService } from './application/ports/discovery.application.service.port';
import { ProfileModule } from '../user-management/profile/profile.module';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { DiscoveryResolver } from './presenter/graphql/discovery.resolver';
import { LikeModule } from '../interactions/likes/like.module';

const applicationService: Provider[] = [
  {
    provide: DiscoveryApplicationService,
    useExisting: DiscoveryApplicationServiceImpl,
  },
  DiscoveryApplicationServiceImpl,
];

const resolvers: Provider[] = [DiscoveryResolver];

const externalModules = [ProfileModule, LikeModule];

@Module({
  imports: [GqlModule, ...externalModules],
  providers: [...resolvers, ...applicationService],
  controllers: [],
})
export class DiscoveryModule {}
