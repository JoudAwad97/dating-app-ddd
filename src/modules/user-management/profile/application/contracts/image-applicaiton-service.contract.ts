import { ImageResponseDto } from '@src/modules/user-management/images/presenter/dto/image.dto';

export abstract class ImageApplicationServiceContract {
  abstract getProfileImages(profileId: string): Promise<ImageResponseDto[]>;
}
