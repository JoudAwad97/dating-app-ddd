import { Injectable } from '@nestjs/common';
import { BaseOrmEntityRepository } from '@src/libs/databases/prisma/base-entity.repository';
import { AccountEntity } from '@src/modules/user-management/account/domain/account.entity';
import { AccountDatabaseModel } from '../schema/account.schema';
import { AccountRepository } from './account.repository.port';
import { PrismaService } from '@src/shared/infrastructure/persistence/orm/prisma';
import { Prisma } from '@prisma/client';
import { AccountMapper } from '../mapper/account.mapper.port';

@Injectable()
export class AccountRepositoryImpl
  extends BaseOrmEntityRepository<
    AccountEntity,
    AccountDatabaseModel,
    'Account'
  >
  implements AccountRepository
{
  protected prismaService: PrismaService;
  protected modelName: Prisma.ModelName = 'Account';

  constructor(protected readonly mapper: AccountMapper) {
    super(mapper);
    this.prismaService = new PrismaService();
  }
  async updateAccountProfileIds(
    accountId: string,
    profileId: string,
  ): Promise<void> {
    await this.prismaService.account.update({
      where: { id: accountId },
      data: { profilesIds: { push: profileId } },
    });
  }

  async findOneByEmail(email: string): Promise<AccountEntity | null> {
    return this.prismaService.account
      .findUnique({ where: { email } })
      .then((account) => (account ? this.mapper.toDomain(account) : null));
  }
}
