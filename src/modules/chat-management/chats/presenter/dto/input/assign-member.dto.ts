import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignMemberToChatDto {
  @Field()
  @IsUUID()
  chatId: string;

  @Field()
  @IsUUID()
  profileId: string;

  @Field()
  @IsUUID()
  ownerId: string;
}
