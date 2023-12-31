import { Module } from '@nestjs/common';
import { DislikeMapperImpl } from './mapper/dislike.mapper';
import { DislikeRepositoryImpl } from './repository/dislike.repository';
import { DislikeMapper } from './mapper/dislike.mapper.port';
import { DislikeRepository } from './repository/dislike.repository.port';

@Module({
  providers: [
    {
      provide: DislikeMapper,
      useExisting: DislikeMapperImpl,
    },
    {
      provide: DislikeRepository,
      useExisting: DislikeRepositoryImpl,
    },
    DislikeMapperImpl,
    DislikeRepositoryImpl,
  ],
  exports: [DislikeMapper, DislikeRepository],
})
export class DislikeOrmModule {}
