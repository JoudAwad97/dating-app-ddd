import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  data: T[];
  pageInfo: {
    count: number;
    take: number;
    cursor: string;
    hasNextPage: boolean;
  };
}

@ObjectType()
export class PageInfo {
  @Field()
  take: number;

  @Field()
  hasNextPage: boolean;

  @Field({
    nullable: true,
    description:
      'The cursor of the last item in the list. Use this to get the next page.',
  })
  cursor: string;

  @Field(() => Int, {
    description:
      'The total number of items in the collection, not just the current page.',
  })
  count: number;
}

export function PaginatedGraphqlResponse<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    constructor(props: IPaginatedType<T>) {
      this.pageInfo = props.pageInfo;
      this.data = props.data;
    }

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => [classRef])
    readonly data: T[];
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
