import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class ImageCreatedEvent extends DomainEvent {
  public readonly imageId: string;
  public readonly profileId: string;

  constructor(props: DomainEventProps<ImageCreatedEvent>) {
    super(props);
    this.imageId = props.imageId;
    this.profileId = props.profileId;
  }
}
