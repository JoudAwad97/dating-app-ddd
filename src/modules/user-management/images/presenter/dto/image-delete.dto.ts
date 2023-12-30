import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteImageDto {
  @Field()
  @IsUUID()
  imageId: string;
}
