import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';

@ObjectType()
export class DislikeResponseDto extends ResponseBase {
  @Field()
  reason: string;

  @Field()
  sourceProfileId: string;

  @Field()
  targetProfileId: string;
}
