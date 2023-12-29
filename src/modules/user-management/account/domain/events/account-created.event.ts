import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class AccountCreatedEvent extends DomainEvent {
  public readonly accountId: string;
  public readonly email: string;

  constructor(props: DomainEventProps<AccountCreatedEvent>) {
    super(props);
    this.accountId = props.accountId;
    this.email = props.email;
  }
}
