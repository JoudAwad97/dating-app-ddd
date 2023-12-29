import { Mapper } from '@src/libs/ddd';
import { AccountEntity } from '@src/modules/user-management/account/domain/account.entity';
import { AccountDatabaseModel } from '../schema/account.schema';
import { AccountResponseDto } from '@src/modules/user-management/account/presenter/dto/account.dto';

export abstract class AccountMapper extends Mapper<
  AccountEntity,
  AccountDatabaseModel,
  AccountResponseDto
> {}
