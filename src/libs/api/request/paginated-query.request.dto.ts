import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

@InputType()
export class PaginatedQueryRequestDto {
  @IsOptional()
  @IsInt()
  @Min(-20)
  @Max(99999)
  @Type(() => Number)
  @Field()
  readonly take?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  readonly cursor?: string;
}
