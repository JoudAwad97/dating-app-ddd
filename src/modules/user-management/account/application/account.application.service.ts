import { AccountEntity } from '../domain/account.entity';
import { UserErrors } from '../domain/user.errors';
import { AccountMapper } from '../infrastructure/persistence/orm/mapper/account.mapper.port';
import { AccountRepository } from '../infrastructure/persistence/orm/repository/account.repository.port';
import { AccountCreateInput } from '../presenter/dto/account-create.dto';
import { AccountUpdateDto } from '../presenter/dto/account-update.dto';
import { AccountResponseDto } from '../presenter/dto/account.dto';
import { AccountApplicationService } from './ports/account.application.service.port';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@src/libs/ports/event-publisher.port';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

@Injectable()
export class AccountApplicationServiceImpl
  implements AccountApplicationService
{
  private readonly logger = createLogger(AccountApplicationServiceImpl.name);

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountMapper: AccountMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async createAccount(
    accountCreateDto: AccountCreateInput,
  ): Promise<AccountResponseDto> {
    this.logger.log('AccountApplicationServiceImpl.createAccount');

    const accountWithSameEmail = await this.accountRepository.findOneByEmail(
      accountCreateDto.email,
    );

    if (accountWithSameEmail) {
      accountWithSameEmail.emailCanBeUsedForRegistration();
    }

    const account = AccountEntity.create({
      email: accountCreateDto.email,
      password: accountCreateDto.password,
    });

    const accountDb = await this.accountRepository.create(account);

    account.publishEvents(this.publisher, this.logger);

    return this.accountMapper.toResponse(accountDb);
  }

  async updateAccount(
    accountUpdateDto: AccountUpdateDto,
  ): Promise<AccountResponseDto> {
    this.logger.log('AccountApplicationServiceImpl.updateAccount');

    const { id, email, password } = accountUpdateDto;

    const [accountToBeUpdated, accountWithSameEmail] = await Promise.all([
      this.accountRepository.findById(id),
      this.accountRepository.findOneByEmail(email),
    ]);

    if (!accountToBeUpdated) {
      throw UserErrors.AccountNotFound();
    }

    if (
      accountWithSameEmail &&
      accountWithSameEmail.id.toString() !== accountToBeUpdated.id.toString()
    ) {
      throw UserErrors.EmailAlreadyInUse();
    }

    if (password) {
      accountToBeUpdated.updatePassword(password);
    }

    if (email) {
      accountToBeUpdated.updateEmail(email);
    }

    const accountDb = await this.accountRepository.update(accountToBeUpdated);

    accountToBeUpdated.publishEvents(this.publisher, this.logger);

    return this.accountMapper.toResponse(accountDb);
  }
}
