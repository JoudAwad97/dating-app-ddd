import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class ImageDeletedEvent extends DomainEvent {
  public readonly imageId: string;
  public readonly profileId: string;

  constructor(props: DomainEventProps<ImageDeletedEvent>) {
    super(props);
    this.imageId = props.imageId;
    this.profileId = props.profileId;
  }
}
