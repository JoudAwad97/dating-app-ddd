import { Module } from '@nestjs/common';
import { AccountMapper } from './mapper/account.mapper.port';
import { AccountMapperImpl } from './mapper/account.mapper';
import { AccountRepositoryImpl } from './repository/account.repository';
import { AccountRepository } from './repository/account.repository.port';

@Module({
  imports: [],
  providers: [
    {
      provide: AccountMapper,
      useExisting: AccountMapperImpl,
    },
    {
      provide: AccountRepository,
      useExisting: AccountRepositoryImpl,
    },
    AccountRepositoryImpl,
    AccountMapperImpl,
  ],
  exports: [AccountMapper, AccountRepository],
})
export class AccountOrmModule {}
