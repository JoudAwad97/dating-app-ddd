import { DomainEvent, DomainEventProps } from '@src/libs/ddd';

export class ChatDeletedEvent extends DomainEvent {
  public readonly chatId: string;

  constructor(props: DomainEventProps<ChatDeletedEvent>) {
    super(props);
    this.chatId = props.chatId;
  }
}
