import { Injectable } from '@nestjs/common';
import { DislikeMapper } from './dislike.mapper.port';
import { DislikeEntity } from '@src/modules/interactions/dislikes/domain/dislike.entity';
import { DislikeResponseDto } from '@src/modules/interactions/dislikes/presenter/dto/dislike.dto';
import {
  DislikeDatabaseModel,
  DislikeDatabaseSchema,
} from '../schema/dislike.schema';

@Injectable()
export class DislikeMapperImpl extends DislikeMapper {
  toPersistence(entity: DislikeEntity): DislikeDatabaseModel {
    const copy = entity.getProps();
    const record: DislikeDatabaseModel = {
      id: copy.id,
      sourceProfileId: copy.sourceProfileId,
      targetProfileId: copy.targetProfileId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return DislikeDatabaseSchema.parse(record);
  }

  toDomain(record: DislikeDatabaseModel): DislikeEntity {
    const dislike = new DislikeEntity({
      id: record.id,
      props: {
        sourceProfileId: record.sourceProfileId,
        targetProfileId: record.targetProfileId,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
    return dislike;
  }

  toResponse(entity: DislikeEntity): DislikeResponseDto {
    const props = entity.getProps();
    const response = new DislikeResponseDto({
      id: props.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    response.sourceProfileId = props.sourceProfileId;
    response.targetProfileId = props.targetProfileId;
    return response;
  }
}
