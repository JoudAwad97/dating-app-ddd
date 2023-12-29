import { AccountCreateInput } from '../../presenter/dto/account-create.dto';
import { AccountResponseDto } from '../../presenter/dto/account.dto';

export abstract class AccountApplicationService {
  abstract createAccount(
    accountCreateDto: AccountCreateInput,
  ): Promise<AccountResponseDto>;
}
