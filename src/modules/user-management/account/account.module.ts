import { Module, Provider } from '@nestjs/common';
import { AccountInfrastructureModule } from './infrastructure/account-infrastructure.module';
import { AccountResolver } from './presenter/graphql/account.resolver';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { AccountApplicationServiceImpl } from './application/account.application.service';
import { AccountApplicationService } from './application/ports/account.application.service.port';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { AccountCreatedEventHandler } from './application/event-handlers/account-created.event.handler';
import { ProfileCreatedEventHandler } from './application/event-handlers/profile-created.event.handler';

const resolvers: Provider[] = [AccountResolver];
const applicationServices: Provider[] = [
  {
    provide: AccountApplicationService,
    useExisting: AccountApplicationServiceImpl,
  },
  AccountApplicationServiceImpl,
];
const eventHandlers: Provider[] = [
  AccountCreatedEventHandler,
  ProfileCreatedEventHandler,
];

@Module({
  imports: [
    AccountInfrastructureModule,
    GqlModule,
    LoggerModule,
    PublisherModule,
  ],
  providers: [...resolvers, ...applicationServices, ...eventHandlers],
  controllers: [],
  exports: [],
})
export class AccountModule {}
