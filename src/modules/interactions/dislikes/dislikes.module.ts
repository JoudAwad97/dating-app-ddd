import { Module } from '@nestjs/common';
import { DislikeInfrastructureModule } from './infrastructure/dislike-infrastructure.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';

@Module({
  imports: [PublisherModule, GqlModule, DislikeInfrastructureModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DislikesModule {}
