import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';

@ObjectType()
export class ReportResponseDto extends ResponseBase {
  @Field()
  reason: string;

  @Field()
  sourceProfileId: string;

  @Field()
  targetProfileId: string;
}
