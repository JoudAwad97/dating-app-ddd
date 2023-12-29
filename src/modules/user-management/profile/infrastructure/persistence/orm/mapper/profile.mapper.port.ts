import { Mapper } from '@src/libs/ddd';
import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';
import { ProfileDatabaseModel } from '../schema/profile.schema';
import { ProfileResponseDto } from '@src/modules/user-management/profile/presenter/dto/profile.dto';

export abstract class ProfileMapper extends Mapper<
  ProfileEntity,
  ProfileDatabaseModel,
  ProfileResponseDto
> {}
