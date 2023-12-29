import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';

@ObjectType()
export class AccountResponseDto extends ResponseBase {
  @Field()
  email: string;
}
