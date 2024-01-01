import { Module } from '@nestjs/common';
import { LikeMapperImpl } from './mapper/like.mapper';
import { LikeRepositoryImpl } from './repository/like.repository';
import { LikeRepository } from './repository/like.repository.port';
import { LikeMapper } from './mapper/like.mapper.port';

@Module({
  providers: [
    {
      provide: LikeRepository,
      useExisting: LikeRepositoryImpl,
    },
    {
      provide: LikeMapper,
      useExisting: LikeMapperImpl,
    },
    LikeMapperImpl,
    LikeRepositoryImpl,
  ],
  exports: [LikeRepository, LikeMapper],
})
export class LikeOrmModule {}
