import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './modules/user-management/account/account.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/user-management/profile/profile.module';
import { ImageModule } from './modules/user-management/images/image.module';
import { LikeModule } from './modules/interactions/likes/like.module';
import { DislikesModule } from './modules/interactions/dislikes/dislikes.module';
import { ReportsModule } from './modules/interactions/reports/reports.module';
import { ChatsModule } from './modules/chat-management/chats/chats.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

const systemModules = [
  AccountModule,
  ProfileModule,
  ImageModule,
  LikeModule,
  DislikesModule,
  ReportsModule,
  DiscoveryModule,
  ChatsModule,
];

const externalModules = [RequestContextModule, LoggerModule];

@Module({
  imports: [ConfigModule.forRoot(), ...systemModules, ...externalModules],
  controllers: [AppController],
  providers: [...interceptors],
})
export class AppModule {}
