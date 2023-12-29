import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class ProfileCreatedEvent extends DomainEvent {
  public readonly accountId: string;
  public readonly profileId: string;

  constructor(props: DomainEventProps<ProfileCreatedEvent>) {
    super(props);
    this.accountId = props.accountId;
    this.profileId = props.profileId;
  }
}
