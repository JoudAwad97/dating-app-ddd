import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '../../application/constants';

@InputType()
export class ProfileCreateDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(BIO_MAX_LENGTH)
  bio: string;

  @Field()
  @IsString()
  @MaxLength(NAME_MAX_LENGTH)
  @MinLength(NAME_MIN_LENGTH)
  name: string;

  @Field()
  @IsUUID()
  accountId: string;
}
