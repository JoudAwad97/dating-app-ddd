import { AggregateRoot } from '@src/libs/ddd';
import { ChatCreateProps, ChatProps } from './chat.types';
import { v4 as uuidv4 } from 'uuid';
import { ChatStatus } from './enums/chat-status.enum';
import { ChatErrors } from './chat.errors';

export class ChatEntity extends AggregateRoot<ChatProps> {
  protected _id: string;

  static create(props: ChatCreateProps): ChatEntity {
    const id = uuidv4();

    const chat = new ChatEntity({
      id,
      props: {
        status: ChatStatus.ACTIVE,
        type: props.type,
        name: props.name,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return chat;
  }

  canChatAcceptNewMembers() {
    if (this.props.status !== ChatStatus.ACTIVE) {
      throw ChatErrors.MemberCanNotBeAddedToChat();
    }

    return true;
  }

  public validate(): void {}
}
