import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class DislikeCreatedEvent extends DomainEvent {
  public readonly sourceProfileId: string;
  public readonly targetProfileId: string;

  constructor(props: DomainEventProps<DislikeCreatedEvent>) {
    super(props);
    this.sourceProfileId = props.sourceProfileId;
    this.targetProfileId = props.targetProfileId;
  }
}
