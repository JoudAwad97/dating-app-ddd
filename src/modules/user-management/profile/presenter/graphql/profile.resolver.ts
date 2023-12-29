import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProfileResponseDto } from '../dto/profile.dto';
import { ProfileApplicationService } from '../../application/ports/profile.application.service.port';
import { ProfileCreateDto } from '../dto/profile-create.dto';
import { ProfileUpdateDto } from '../dto/profile-update.dto';

@Resolver()
export class ProfileResolver {
  constructor(private readonly applicationService: ProfileApplicationService) {}

  @Mutation(() => ProfileResponseDto)
  async createProfile(@Args('input') input: ProfileCreateDto) {
    return this.applicationService.createProfile(input);
  }

  @Mutation(() => ProfileResponseDto)
  async updateProfile(@Args('input') input: ProfileUpdateDto) {
    return this.applicationService.updateProfile(input);
  }
}
