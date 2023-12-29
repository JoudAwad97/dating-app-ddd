import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountCreatedEvent } from '../../domain/events/account-created.event';
import { createLogger } from '@src/shared/infrastructure/logger/logger.factory';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedEventHandler
  implements IEventHandler<AccountCreatedEvent>
{
  private readonly logger = createLogger(AccountCreatedEventHandler.name);

  handle(event: AccountCreatedEvent) {
    this.logger.log('AccountCreatedEventHandler.handle');
    this.logger.log(`Validating Account with email: ${event.email}`);
  }
}
