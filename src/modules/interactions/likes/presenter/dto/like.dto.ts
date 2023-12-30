import { Field, ObjectType } from '@nestjs/graphql';
import { LikeInteractionStatus } from '../../domain/enums/like-status.enum';

@ObjectType()
export class LikeResponseDto {
  @Field(() => LikeInteractionStatus)
  status: LikeInteractionStatus;
}
