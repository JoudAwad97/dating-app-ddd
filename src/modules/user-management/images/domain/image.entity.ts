import { AggregateRoot } from '@src/libs/ddd';
import { ImageCreateProps, ImageProps } from './image.types';
import { v4 as uuidv4 } from 'uuid';
import { ImageStatus } from './enums/image.enum';
import { ImageCreatedEvent } from './events/image-created.event';
import { ImageDeletedEvent } from './events/image-deleted.event';

export class ImageEntity extends AggregateRoot<ImageProps> {
  protected _id: string;

  static create(props: ImageCreateProps) {
    const id = uuidv4();

    const image = new ImageEntity({
      id,
      props: {
        url: props.url,
        profileId: props.profileId,
        status: props.status,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    image.addEvent(
      new ImageCreatedEvent({
        profileId: props.profileId,
        imageId: id,
        aggregateId: id,
      }),
    );

    return image;
  }

  updateStatus(status: ImageStatus) {
    this.props.status = status;
  }

  delete() {
    this.addEvent(
      new ImageDeletedEvent({
        aggregateId: this.getProps().id,
        imageId: this.getProps().id,
        profileId: this.getProps().profileId,
      }),
    );
  }

  public validate(): void {}
}
