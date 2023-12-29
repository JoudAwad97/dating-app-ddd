import { RepositoryPort } from '@src/libs/ports/repository.port';
import { AccountEntity } from '@src/modules/user-management/account/domain/account.entity';

export abstract class AccountRepository extends RepositoryPort<AccountEntity> {
  abstract findOneByEmail(email: string): Promise<AccountEntity | null>;
  abstract updateAccountProfileIds(
    accountId: string,
    profileId: string,
  ): Promise<void>;
}
