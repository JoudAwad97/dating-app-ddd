import { AggregateRoot } from '@src/libs/ddd';
import { v4 as uuidv4 } from 'uuid';
import { DislikeCreateProps, DislikeProps } from './dislike.types';
import { DislikeCreatedEvent } from './events/dislike-created.event';
import { DislikeErrors } from './dislike.errors';

export class DislikeEntity extends AggregateRoot<DislikeProps> {
  protected _id: string;

  static create(props: DislikeCreateProps): DislikeEntity {
    const id = uuidv4();

    const dislike = new DislikeEntity({
      id,
      props: {
        sourceProfileId: props.sourceProfileId,
        targetProfileId: props.targetProfileId,
        reason: props.reason,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    dislike.addEvent(
      new DislikeCreatedEvent({
        sourceProfileId: props.sourceProfileId,
        targetProfileId: props.targetProfileId,
        aggregateId: id,
      }),
    );

    return dislike;
  }

  private canDislikeBeCreated() {
    if (this.getProps().sourceProfileId === this.getProps().targetProfileId) {
      throw DislikeErrors.InvalidDislikeInteraction();
    }
  }

  public validate(): void {
    this.canDislikeBeCreated();
  }
}
