import { Mapper } from '@src/libs/ddd';
import { DislikeEntity } from '@src/modules/interactions/dislikes/domain/dislike.entity';
import { DislikeDatabaseModel } from '../schema/dislike.schema';
import { DislikeResponseDto } from '@src/modules/interactions/dislikes/presenter/dto/dislike.dto';

export abstract class DislikeMapper extends Mapper<
  DislikeEntity,
  DislikeDatabaseModel,
  DislikeResponseDto
> {}
