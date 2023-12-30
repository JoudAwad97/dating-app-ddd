import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class LikeInteractionEvent extends DomainEvent {
  public readonly likeInteractionId: string;

  constructor(props: DomainEventProps<LikeInteractionEvent>) {
    super(props);
    this.likeInteractionId = props.likeInteractionId;
  }
}
