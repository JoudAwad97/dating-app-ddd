import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import {
  REASON_MAX_LENGTH,
  REASON_MIN_LENGTH,
} from '../../application/constants';

@InputType()
export class CreateReportDto {
  @Field()
  @IsUUID()
  sourceProfileId: string;

  @Field()
  @IsUUID()
  targetProfileId: string;

  @Field()
  @MinLength(REASON_MIN_LENGTH)
  @MaxLength(REASON_MAX_LENGTH)
  reason: string;
}
