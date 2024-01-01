import { Field, InputType } from '@nestjs/graphql';
import { PaginatedQueryRequestDto } from '@src/libs/api/request/paginated-query.request.dto';
import { IsUUID } from 'class-validator';

@InputType()
export class DiscoveryQueryDto extends PaginatedQueryRequestDto {
  @Field()
  @IsUUID()
  profileId: string;
}
