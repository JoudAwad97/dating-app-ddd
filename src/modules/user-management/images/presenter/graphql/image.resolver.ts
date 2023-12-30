import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageResponseDto } from '../dto/image.dto';
import { ImageApplicationService } from '../../application/ports/image.application.service.port';
import { CreateImageDto } from '../dto/image-create.dto';
import { DeleteImageDto } from '../dto/image-delete.dto';

@Resolver()
export class ImageResolver {
  constructor(
    private readonly imageApplicationService: ImageApplicationService,
  ) {}

  @Mutation(() => ImageResponseDto)
  async createImage(
    @Args('input') input: CreateImageDto,
  ): Promise<ImageResponseDto> {
    return this.imageApplicationService.createImage(input);
  }

  @Mutation(() => Boolean)
  async deleteImage(@Args('input') input: DeleteImageDto): Promise<boolean> {
    return this.imageApplicationService.deleteImage(input);
  }
}
