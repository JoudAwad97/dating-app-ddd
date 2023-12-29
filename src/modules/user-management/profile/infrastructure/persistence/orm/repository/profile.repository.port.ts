import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ProfileEntity } from '@src/modules/user-management/profile/domain/profile.entity';

export abstract class ProfileRepository extends RepositoryPort<ProfileEntity> {}
