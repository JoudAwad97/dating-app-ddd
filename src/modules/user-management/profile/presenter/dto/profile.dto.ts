import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedGraphqlResponse } from '@src/libs/api/response/paginated/paginated.graphql-response.base';
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

@ObjectType()
export class ProfilePaginatedResponseDto extends PaginatedGraphqlResponse(
  ProfileResponseDto,
) {
  @Field(() => [ProfileResponseDto])
  data: ProfileResponseDto[];
}
