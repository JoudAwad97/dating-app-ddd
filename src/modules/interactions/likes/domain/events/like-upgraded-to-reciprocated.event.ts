import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class LikeUpgradedToReciprocatedEvent extends DomainEvent {
  public readonly likeInteractionId: string;

  constructor(props: DomainEventProps<LikeUpgradedToReciprocatedEvent>) {
    super(props);
    this.likeInteractionId = props.likeInteractionId;
  }
}
