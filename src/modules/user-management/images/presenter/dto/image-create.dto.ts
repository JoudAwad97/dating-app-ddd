import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, IsUrl } from 'class-validator';

@InputType()
export class CreateImageDto {
  @Field()
  @IsUrl()
  url: string;

  @Field()
  @IsUUID()
  profileId: string;
}
