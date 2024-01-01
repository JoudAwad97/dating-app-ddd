import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';
import { ChatTypes } from '../../../domain/chats/enums/chat-type.enum';
import { ChatStatus } from '../../../domain/chats/enums/chat-status.enum';

@ObjectType()
export class ChatResponseDto extends ResponseBase {
  @Field()
  name: string;

  @Field(() => ChatTypes)
  type: ChatTypes;

  @Field(() => ChatStatus)
  status: ChatStatus;
}
