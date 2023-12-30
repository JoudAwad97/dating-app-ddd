import { ImageApplicationServiceImpl } from './application/image.application.service';
import { Module, Provider } from '@nestjs/common';
import { ImageResolver } from './presenter/graphql/image.resolver';
import { ImageApplicationService } from './application/ports/image.application.service.port';
import { GqlModule } from '@src/shared/presenter/gql/gql.module';
import { PublisherModule } from '@src/shared/infrastructure/publisher/publisher.module';
import { ImageInfrastructureModule } from './infrastructure/image-infrastructure.module';
import { ImageCreatedEventHandler } from './application/event-handlers/image-created.event';

const resolvers: Provider[] = [ImageResolver];
const applicationService: Provider[] = [
  {
    provide: ImageApplicationService,
    useExisting: ImageApplicationServiceImpl,
  },
  ImageApplicationServiceImpl,
];

const eventHandlers: Provider[] = [ImageCreatedEventHandler];

@Module({
  imports: [GqlModule, PublisherModule, ImageInfrastructureModule],
  controllers: [],
  providers: [...resolvers, ...applicationService, ...eventHandlers],
})
export class ImageModule {}
