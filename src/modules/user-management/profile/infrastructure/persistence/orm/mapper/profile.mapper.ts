import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';
import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';
import { ProfileMapper } from './profile.mapper.port';
import {
  ProfileDatabaseModel,
  ProfileDatabaseSchema,
} from '../schema/profile.schema';

export class ProfileMapperImpl extends ProfileMapper {
  toResponseFromPersistence(record: ProfileDatabaseModel): ProfileResponseDto {
    const response = new ProfileResponseDto({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
    response.name = record.name;
    response.bio = record.bio;
    response.accountId = record.accountId;
    return response;
  }

  toPersistence(entity: ProfileEntity): ProfileDatabaseModel {
    const copy = entity.getProps();
    const record: ProfileDatabaseModel = {
      id: entity.id,
      name: copy.name,
      bio: copy.bio,
      accountId: copy.accountId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };
    return ProfileDatabaseSchema.parse(record);
  }

  toDomain(record: ProfileDatabaseModel): ProfileEntity {
    const profile = new ProfileEntity({
      id: record.id,
      props: {
        name: record.name,
        bio: record.bio,
        accountId: record.accountId,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    return profile;
  }

  toResponse(entity: ProfileEntity): ProfileResponseDto {
    const props = entity.getProps();
    const response = new ProfileResponseDto({
      id: entity.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    response.name = props.name;
    response.bio = props.bio;
    response.accountId = props.accountId;
    return response;
  }
}
