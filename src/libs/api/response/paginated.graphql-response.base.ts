import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  data: T[];
  count: number;
  limit: number;
  cursor: string;
}

export function PaginatedGraphqlResponse<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    constructor(props: IPaginatedType<T>) {
      this.count = props.count;
      this.limit = props.limit;
      this.cursor = props.cursor;
      this.data = props.data;
    }
    @Field(() => String)
    cursor: string;

    @Field(() => Int)
    count: number;

    @Field()
    limit: number;

    @Field(() => [classRef])
    readonly data: T[];
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
