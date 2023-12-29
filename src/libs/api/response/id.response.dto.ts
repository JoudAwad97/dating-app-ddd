import { Field } from '@nestjs/graphql';

export class IdResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Field()
  readonly id: string;
}
