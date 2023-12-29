import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './modules/user-management/account/account.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { LoggerModule } from './shared/infrastructure/logger/logger.module';
import { RequestContextModule } from 'nestjs-request-context';
import { ConfigModule } from '@nestjs/config';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

@Module({
  imports: [
    AccountModule,
    LoggerModule,
    RequestContextModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [...interceptors],
})
export class AppModule {}
