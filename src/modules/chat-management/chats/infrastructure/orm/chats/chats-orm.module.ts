import { Module } from '@nestjs/common';
import { ChatsMapperImpl } from './mapper/chats.mapper';
import { ChatsMapper } from './mapper/chats.mapper.port';
import { ChatsRepositoryImpl } from './repository/chats.repository';
import { ChatsRepository } from './repository/chats.repository.port';

@Module({
  providers: [
    {
      provide: ChatsMapper,
      useExisting: ChatsMapperImpl,
    },
    {
      provide: ChatsRepository,
      useExisting: ChatsRepositoryImpl,
    },
    ChatsRepositoryImpl,
    ChatsMapperImpl,
  ],
  exports: [ChatsMapper, ChatsRepository],
})
export class ChatsOrmModule {}
