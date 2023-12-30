import { Module } from '@nestjs/common';
import { ImageMapperImpl } from './mapper/image.mapper';
import { ImageRepositoryImpl } from './repository/image.repository';
import { ImageRepository } from './repository/image.repository.port';
import { ImageMapper } from './mapper/image.mapper.port';

@Module({
  providers: [
    {
      provide: ImageRepository,
      useExisting: ImageRepositoryImpl,
    },
    {
      provide: ImageMapper,
      useExisting: ImageMapperImpl,
    },
    ImageMapperImpl,
    ImageRepositoryImpl,
  ],
  exports: [ImageRepository, ImageMapper],
})
export class ImageOrmModule {}
