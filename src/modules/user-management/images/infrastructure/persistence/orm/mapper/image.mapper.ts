import { ImageEntity } from '@src/modules/user-management/images/domain/image.entity';
import { ImageResponseDto } from '@src/modules/user-management/images/presenter/dto/image.dto';
import { ImageMapper } from './image.mapper.port';
import {
  ImageDatabaseModel,
  ImageDatabaseSchema,
} from '../schema/image.schema';
import { PictureStatus } from '@prisma/client';
import { ImageStatus } from '@src/modules/user-management/images/domain/enums/image.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageMapperImpl extends ImageMapper {
  constructor() {
    super();
    this.toDomain = this.toDomain.bind(this);
  }

  toPersistence(entity: ImageEntity): ImageDatabaseModel {
    const copy = entity.getProps();
    const record: ImageDatabaseModel = {
      id: copy.id,
      url: copy.url,
      status: copy.status,
      profileId: copy.profileId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return ImageDatabaseSchema.parse(record);
  }

  private mapPictureStatusFromDatabaseToDomain(
    status: PictureStatus,
  ): ImageStatus {
    switch (status) {
      case PictureStatus.ACTIVE:
        return ImageStatus.ACTIVE;
      case PictureStatus.INACTIVE:
        return ImageStatus.INACTIVE;
      case PictureStatus.PENDING_VALIDATION:
        return ImageStatus.PENDING_VALIDATION;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  toDomain(record: ImageDatabaseModel): ImageEntity {
    const image = new ImageEntity({
      id: record.id,
      props: {
        url: record.url,
        status: this.mapPictureStatusFromDatabaseToDomain(record.status),
        profileId: record.profileId,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return image;
  }

  toResponse(entity: ImageEntity): ImageResponseDto {
    const props = entity.getProps();
    const response = new ImageResponseDto({
      id: entity.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    response.url = props.url;
    response.status = props.status;
    response.profileId = props.profileId;
    return response;
  }
}
