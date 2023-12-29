import { Module } from '@nestjs/common';
import { ProfileMapper } from './mapper/profile.mapper.port';
import { ProfileMapperImpl } from './mapper/profile.mapper';
import { ProfileRepositoryImpl } from './repository/profile.respository';
import { ProfileRepository } from './repository/profile.repository.port';

@Module({
  imports: [],
  providers: [
    {
      provide: ProfileMapper,
      useExisting: ProfileMapperImpl,
    },
    {
      provide: ProfileRepository,
      useExisting: ProfileRepositoryImpl,
    },
    ProfileRepositoryImpl,
    ProfileMapperImpl,
  ],
  exports: [ProfileMapper, ProfileRepository],
})
export class ProfileOrmModule {}
