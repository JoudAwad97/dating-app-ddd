import { ImageApplicationServiceContract } from '@src/modules/user-management/profile/application/contracts/image-applicaiton-service.contract';
import { CreateImageDto } from '../../presenter/dto/image-create.dto';
import { DeleteImageDto } from '../../presenter/dto/image-delete.dto';
import { ImageResponseDto } from '../../presenter/dto/image.dto';

export abstract class ImageApplicationService extends ImageApplicationServiceContract {
  abstract createImage(input: CreateImageDto): Promise<ImageResponseDto>;
  abstract deleteImage(input: DeleteImageDto): Promise<boolean>;
}
