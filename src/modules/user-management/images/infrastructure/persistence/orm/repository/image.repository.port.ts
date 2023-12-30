import { RepositoryPort } from '@src/libs/ports/repository.port';
import { ImageEntity } from '@src/modules/user-management/images/domain/image.entity';

export abstract class ImageRepository extends RepositoryPort<ImageEntity> {
  abstract imagesCountPerProfile(profileId: string): Promise<number>;
  abstract imagesForProfile(profileId: string): Promise<ImageEntity[]>;
}
