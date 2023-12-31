import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class DislikeCreatedEvent extends DomainEvent {
  public readonly sourceProfileId: string;
  public readonly targetProfileId: string;
  public readonly dislikeId: string;

  constructor(props: DomainEventProps<DislikeCreatedEvent>) {
    super(props);
    this.sourceProfileId = props.sourceProfileId;
    this.targetProfileId = props.targetProfileId;
    this.dislikeId = props.dislikeId;
  }
}
