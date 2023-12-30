import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateLikeDto {
  @Field()
  @IsUUID()
  sourceProfileId: string;

  @Field()
  @IsUUID()
  targetProfileId: string;
}
