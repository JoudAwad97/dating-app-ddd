import { AggregateRoot } from '@src/libs/ddd';
import { CreateProfileProps, ProfileProps } from './profile.types';
import { ProfileCreatedEvent } from './events/profile-created.event';
import { v4 as uuidv4 } from 'uuid';

export class ProfileEntity extends AggregateRoot<ProfileProps> {
  protected _id: string;

  static create(props: CreateProfileProps) {
    const id = uuidv4();

    const profile = new ProfileEntity({
      id: id,
      props: {
        name: props.name,
        bio: props.bio,
        accountId: props.accountId,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    profile.addEvent(
      new ProfileCreatedEvent({
        profileId: id,
        accountId: props.accountId,
        aggregateId: id,
      }),
    );

    return profile;
  }

  updateBio(bio: string | null): void {
    this.props.bio = bio;
  }

  updateName(name: string): void {
    this.props.name = name;
  }

  public validate(): void {}
}
