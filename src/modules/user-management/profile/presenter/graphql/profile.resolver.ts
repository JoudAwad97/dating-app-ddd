import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProfileResponseDto } from '../dto/profile.dto';
import { ProfileApplicationService } from '../../application/ports/profile.application.service.port';
import { ProfileCreateDto } from '../dto/profile-create.dto';
import { ProfileUpdateDto } from '../dto/profile-update.dto';
import { ImageResponseDto } from '@src/modules/user-management/images/presenter/dto/image.dto';
import { ImageApplicationService } from '@src/modules/user-management/images/application/ports/image.application.service.port';

@Resolver(() => ProfileResponseDto)
export class ProfileResolver {
  constructor(
    private readonly profileApplicationService: ProfileApplicationService,
    private readonly imageApplicationService: ImageApplicationService,
  ) {}

  @Mutation(() => ProfileResponseDto)
  async createProfile(@Args('input') input: ProfileCreateDto) {
    return this.profileApplicationService.createProfile(input);
  }

  @Mutation(() => ProfileResponseDto)
  async updateProfile(@Args('input') input: ProfileUpdateDto) {
    return this.profileApplicationService.updateProfile(input);
  }

  @Query(() => ProfileResponseDto)
  async getProfile(@Args('id') id: string) {
    return this.profileApplicationService.getProfile(id);
  }

  @ResolveField(() => [ImageResponseDto])
  async images(@Parent() profile: ProfileResponseDto) {
    return this.imageApplicationService.getProfileImages(profile.id);
  }
}
