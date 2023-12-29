import { Field, ObjectType } from '@nestjs/graphql';
import { IdResponse } from './id.response.dto';

export interface BaseResponseProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Most of our response objects will have properties like
 * id, createdAt and updatedAt so we can move them to a
 * separate class and extend it to avoid duplication.
 */
@ObjectType()
export class ResponseBase extends IdResponse {
  constructor(props: BaseResponseProps) {
    super(props.id);
    this.createdAt = new Date(props.createdAt).toISOString();
    this.updatedAt = new Date(props.updatedAt).toISOString();
  }

  @Field()
  readonly id: string;

  @Field()
  readonly createdAt: string;

  @Field()
  readonly updatedAt: string;
}
