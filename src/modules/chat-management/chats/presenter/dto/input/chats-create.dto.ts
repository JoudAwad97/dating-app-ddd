import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  CHAT_MAX_NAME_LENGTH,
  CHAT_MIN_NAME_LENGTH,
} from '../../../application/constants';
import { ChatTypes } from '../../../domain/chats/enums/chat-type.enum';

@InputType()
export class ChatsCreateDto {
  @Field()
  @IsString()
  @MinLength(CHAT_MIN_NAME_LENGTH)
  @MaxLength(CHAT_MAX_NAME_LENGTH)
  name: string;

  @Field(() => ChatTypes)
  @IsEnum(ChatTypes)
  type: ChatTypes;

  @Field()
  @IsUUID()
  ownerProfileId: string;
}
