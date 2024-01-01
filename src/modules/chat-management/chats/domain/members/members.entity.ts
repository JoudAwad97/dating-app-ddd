import { AggregateRoot } from '@src/libs/ddd';
import { ChatMemberProps } from './members.types';
import { v4 as uuidv4 } from 'uuid';
import { ChatMemberRole } from './enums/chat-member-role.enum';
import { ChatMembersErrors } from './members.errors';

export class MembersEntity extends AggregateRoot<ChatMemberProps> {
  protected _id: string;

  static create(props: ChatMemberProps): MembersEntity {
    const id = uuidv4();

    const entity = new MembersEntity({
      id,
      props: {
        ...props,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return entity;
  }

  chatMemberCanAddMembersToChat() {
    if (this.props.role !== ChatMemberRole.ADMIN) {
      throw ChatMembersErrors.MissingPermissionsToAddChatMember();
    }
    return true;
  }

  public validate(): void {}
}
