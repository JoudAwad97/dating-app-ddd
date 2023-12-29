import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountApplicationService } from '../../application/ports/account.application.service.port';
import { AccountResponseDto } from '../dto/account.dto';
import { AccountCreateInput } from '../dto/account-create.dto';

@Resolver()
export class AccountResolver {
  constructor(
    private readonly accountApplicationService: AccountApplicationService,
  ) {}

  @Mutation(() => AccountResponseDto)
  async createAccount(@Args('input') input: AccountCreateInput) {
    return this.accountApplicationService.createAccount(input);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
