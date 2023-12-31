import { Module, Provider } from '@nestjs/common';
import { ProfileInfrastructure } from './infrastructure/profile-infrastructure.module';
import { ProfileResolver } from './presenter/graphql/profile.resolver';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { ProfileApplicationServiceImpl } from './application/profile.application.service';
import { ProfileApplicationService } from './application/ports/profile.application.service.port';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { ImageModule } from '../images/image.module';
import { ProfileApplicationServiceContract } from '@src/modules/interactions/likes/application/contract/profile-application-service.contract';
import { ChatProfileApplicationServiceContract } from '@src/modules/chat-management/chats/application/contracts/profile-application-service.contract';
import { DiscoveryProfileApplicationServiceContract } from '@src/modules/discovery/application/contracts/profile-application-service.contract';

const resolvers: Provider[] = [ProfileResolver];
const applicationServices: Provider[] = [
  {
    provide: ProfileApplicationService,
    useExisting: ProfileApplicationServiceImpl,
  },
  {
    provide: ProfileApplicationServiceContract,
    useExisting: ProfileApplicationServiceImpl,
  },
  {
    provide: ChatProfileApplicationServiceContract,
    useExisting: ProfileApplicationServiceImpl,
  },
  {
    provide: DiscoveryProfileApplicationServiceContract,
    useExisting: ProfileApplicationServiceImpl,
  },
  ProfileApplicationServiceImpl,
];
const eventHandlers: Provider[] = [];

const dependingOnModules = [ImageModule];

@Module({
  imports: [
    ProfileInfrastructure,
    GqlModule,
    PublisherModule,
    ...dependingOnModules,
  ],
  controllers: [],
  providers: [...resolvers, ...applicationServices, ...eventHandlers],
  exports: [
    ProfileApplicationServiceContract,
    ChatProfileApplicationServiceContract,
    DiscoveryProfileApplicationServiceContract,
  ],
})
export class ProfileModule {}
