import { Module } from '@nestjs/common';
import { MemberMapperImpl } from './mapper/member.mapper';
import { MemberMapper } from './mapper/member.mapper.port';
import { MembersRepositoryImpl } from './repository/member.repository';
import { MembersRepository } from './repository/member.repository.port';

@Module({
  providers: [
    {
      provide: MemberMapper,
      useExisting: MemberMapperImpl,
    },
    {
      provide: MembersRepository,
      useExisting: MembersRepositoryImpl,
    },
    MembersRepositoryImpl,
    MemberMapperImpl,
  ],
  exports: [MemberMapper, MembersRepository],
})
export class ChatsMemberOrmModule {}
