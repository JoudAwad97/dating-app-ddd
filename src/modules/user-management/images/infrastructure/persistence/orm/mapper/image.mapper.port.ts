import { Mapper } from '@src/libs/ddd';
import { ImageEntity } from '@src/modules/user-management/images/domain/image.entity';
import { ImageDatabaseModel } from '../schema/image.schema';
import { ImageResponseDto } from '@src/modules/user-management/images/presenter/dto/image.dto';

export abstract class ImageMapper extends Mapper<
  ImageEntity,
  ImageDatabaseModel,
  ImageResponseDto
> {}
