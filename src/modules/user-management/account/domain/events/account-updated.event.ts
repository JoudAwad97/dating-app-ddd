import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class AccountUpdatedEvent extends DomainEvent {
  public readonly accountId: string;
  public readonly email: string;

  constructor(props: DomainEventProps<AccountUpdatedEvent>) {
    super(props);
    this.accountId = props.accountId;
    this.email = props.email;
  }
}
