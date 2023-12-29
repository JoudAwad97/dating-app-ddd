import { Module, Provider } from '@nestjs/common';
import { ProfileInfrastructure } from './infrastructure/profile-infrastructure.module';
import { ProfileResolver } from './presenter/graphql/profile.resolver';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { ProfileApplicationServiceImpl } from './application/profile.application.service';
import { ProfileApplicationService } from './application/ports/profile.application.service.port';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';

const resolvers: Provider[] = [ProfileResolver];
const applicationServices: Provider[] = [
  {
    provide: ProfileApplicationService,
    useExisting: ProfileApplicationServiceImpl,
  },
  ProfileApplicationServiceImpl,
];
const eventHandlers: Provider[] = [];

@Module({
  imports: [ProfileInfrastructure, GqlModule, PublisherModule],
  controllers: [],
  providers: [...resolvers, ...applicationServices, ...eventHandlers],
})
export class ProfileModule {}