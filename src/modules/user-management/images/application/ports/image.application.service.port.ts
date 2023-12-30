import { CreateImageDto } from '../../presenter/dto/image-create.dto';
import { DeleteImageDto } from '../../presenter/dto/image-delete.dto';
import { ImageResponseDto } from '../../presenter/dto/image.dto';

export abstract class ImageApplicationService {
  abstract createImage(input: CreateImageDto): Promise<ImageResponseDto>;
  abstract deleteImage(input: DeleteImageDto): Promise<boolean>;
}
