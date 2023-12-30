import { Injectable } from '@nestjs/common';
import { LikeMapper } from './like.mapper.port';
import { LikeEntity } from '@src/modules/interactions/likes/domain/like.entity';
import { LikeResponseDto } from '@src/modules/interactions/likes/presenter/dto/like.dto';
import { LikeDatabaseModel, LikeDatabaseSchema } from '../schema/like.schema';
import { LikeInteractionStatus } from '@src/modules/interactions/likes/domain/enums/like-status.enum';
import { InteractionStatus } from '@prisma/client';

@Injectable()
export class LikeMapperImpl extends LikeMapper {
  constructor() {
    super();
    this.toDomain = this.toDomain.bind(this);
  }

  toPersistence(entity: LikeEntity): LikeDatabaseModel {
    const copy = entity.getProps();
    const record: LikeDatabaseModel = {
      id: copy.id,
      status: copy.status,
      sourceProfileId: copy.sourceProfileId,
      targetProfileId: copy.targetProfileId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return LikeDatabaseSchema.parse(record);
  }

  private mapLikeStatusFromDatabaseToDomain(
    status: InteractionStatus,
  ): LikeInteractionStatus {
    switch (status) {
      case InteractionStatus.SENT:
        return LikeInteractionStatus.SENT;
      case InteractionStatus.RECIPROCATED:
        return LikeInteractionStatus.RECIPROCATED;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  toDomain(record: LikeDatabaseModel): LikeEntity {
    const like = new LikeEntity({
      id: record.id,
      props: {
        status: this.mapLikeStatusFromDatabaseToDomain(record.status),
        sourceProfileId: record.sourceProfileId,
        targetProfileId: record.targetProfileId,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return like;
  }

  toResponse(entity: LikeEntity): LikeResponseDto {
    const props = entity.getProps();
    const response = new LikeResponseDto();
    response.status = props.status;
    return response;
  }
}
