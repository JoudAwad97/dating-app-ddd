import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProfileCreatedEvent } from '@src/modules/user-management/profile/domain/events/profile-created.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';
import { AccountRepository } from '../../infrastructure/persistence/orm/repository/account.repository.port';

@EventsHandler(ProfileCreatedEvent)
export class ProfileCreatedEventHandler
  implements IEventHandler<ProfileCreatedEvent>
{
  private readonly logger = createLogger(ProfileCreatedEventHandler.name);

  constructor(private readonly accountRepository: AccountRepository) {}

  async handle(event: ProfileCreatedEvent) {
    this.logger.log(`ProfileCreatedEventHandler.handle`);

    const { accountId, profileId } = event;

    await this.accountRepository.updateAccountProfileIds(accountId, profileId);
  }
}
