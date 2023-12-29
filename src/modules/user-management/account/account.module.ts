import { Module, Provider } from '@nestjs/common';
import { AccountInfrastructureModule } from './infrastructure/account-infrastructure.module';
import { AccountResolver } from './presenter/graphql/account.resolver';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { AccountApplicationServiceImpl } from './application/account.application.service';
import { AccountApplicationService } from './application/ports/account.application.service.port';
import { LoggerModule } from '@src/shared/infrastructure/logger/logger.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';

const resolvers: Provider[] = [AccountResolver];
const applicationServices: Provider[] = [
  {
    provide: AccountApplicationService,
    useExisting: AccountApplicationServiceImpl,
  },
  AccountApplicationServiceImpl,
];

@Module({
  imports: [
    AccountInfrastructureModule,
    GqlModule,
    LoggerModule,
    PublisherModule,
  ],
  providers: [...resolvers, ...applicationServices],
  controllers: [],
  exports: [],
})
export class AccountModule {}
