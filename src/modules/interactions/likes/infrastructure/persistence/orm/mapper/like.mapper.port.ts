import { Mapper } from '@src/libs/ddd';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';
import { LikeDatabaseModel } from '../schema/like.schema';
import { LikeResponseDto } from '@src/modules/interactions/likes/presenter/dto/like.dto';

export abstract class LikeMapper extends Mapper<
  LikeEntity,
  LikeDatabaseModel,
  LikeResponseDto
> {}
