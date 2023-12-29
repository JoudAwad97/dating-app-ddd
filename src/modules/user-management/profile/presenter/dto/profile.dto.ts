import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';

@ObjectType()
export class ProfileResponseDto extends ResponseBase {
  @Field()
  id: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  name: string;

  @Field()
  accountId: string;
}
