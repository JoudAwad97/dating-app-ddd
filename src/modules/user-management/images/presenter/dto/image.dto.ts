import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseBase } from '@src/libs/api/response/response.base';
import { ImageStatus } from '../../domain/enums/image.enum';

@ObjectType()
export class ImageResponseDto extends ResponseBase {
  @Field()
  profileId: string;

  @Field()
  url: string;

  @Field(() => ImageStatus)
  status: ImageStatus;
}
