import { AggregateRoot } from '@src/libs/ddd';
import { LikeCreateProps, LikeProps } from './like.types';
import { LikeInteractionEvent } from './events/like-interaction-created.event';
import { v4 as uuidv4 } from 'uuid';
import { LikeInteractionStatus } from './enums/like-status.enum';
import { LikeUpgradedToReciprocatedEvent } from './events/like-upgraded-to-reciprocated.event';
import { LikeErrors } from './like.errors';

export class LikeEntity extends AggregateRoot<LikeProps> {
  protected _id: string;

  static create(props: LikeCreateProps): LikeEntity {
    const id = uuidv4();

    const like = new LikeEntity({
      id,
      props: {
        sourceProfileId: props.sourceProfileId,
        targetProfileId: props.targetProfileId,
        status: LikeInteractionStatus.SENT,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    like.addEvent(
      new LikeInteractionEvent({
        aggregateId: id,
        likeInteractionId: id,
      }),
    );

    return like;
  }

  canCreateLike(sourceProfileId: string, targetProfileId: string): boolean {
    if (sourceProfileId === targetProfileId) {
      throw LikeErrors.CanNotLikeYourself();
    }
    return true;
  }

  upgradeToReciprocatedLike(sourceProfileId: string, targetProfileId: string) {
    if (this.getProps().status === LikeInteractionStatus.RECIPROCATED) {
      throw LikeErrors.LikeIsAlreadyReciprocated();
    }

    if (this.getProps().sourceProfileId !== targetProfileId) {
      throw LikeErrors.InvalidLikeInteraction();
    }

    if (this.getProps().targetProfileId !== sourceProfileId) {
      throw LikeErrors.InvalidLikeInteraction();
    }

    this.props.status = LikeInteractionStatus.RECIPROCATED;
    this.addEvent(
      new LikeUpgradedToReciprocatedEvent({
        aggregateId: this.id,
        likeInteractionId: this.id,
      }),
    );
  }

  public validate(): void {
    throw new Error('Method not implemented.');
  }
}
