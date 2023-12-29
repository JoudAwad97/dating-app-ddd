import { AccountCreateInput } from '../../presenter/dto/account-create.dto';
import { AccountUpdateDto } from '../../presenter/dto/account-update.dto';
import { AccountResponseDto } from '../../presenter/dto/account.dto';

export abstract class AccountApplicationService {
  abstract createAccount(
    accountCreateDto: AccountCreateInput,
  ): Promise<AccountResponseDto>;
  abstract updateAccount(
    accountUpdateDto: AccountUpdateDto,
  ): Promise<AccountResponseDto>;
}
