import { ChatsApplicationServiceImpl } from './application/chats.application.service';
import { Module, Provider } from '@nestjs/common';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { ChatsInfrastructureModule } from './infrastructure/chats-infrastructure.module';
import { ChatsResolver } from './presenter/graphql/chats.resolver';
import { ProfileModule } from '@src/modules/user-management/profile/profile.module';
import { ChatService } from './domain/chats/chat.service';
import { ChatsApplicationService } from './application/ports/chats.application.service.port';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';

const resolvers: Provider[] = [ChatsResolver];
const applicationService: Provider[] = [
  {
    provide: ChatsApplicationService,
    useExisting: ChatsApplicationServiceImpl,
  },
  ChatsApplicationServiceImpl,
];

const domainServices: Provider[] = [ChatService];

const eventHandlers: Provider[] = [];

const externalModules = [ProfileModule];

@Module({
  imports: [
    PublisherModule,
    GqlModule,
    ChatsInfrastructureModule,
    ...externalModules,
  ],
  providers: [
    ...resolvers,
    ...applicationService,
    ...eventHandlers,
    ...domainServices,
    PrismaService,
  ],
  exports: [],
})
export class ChatsModule {}
