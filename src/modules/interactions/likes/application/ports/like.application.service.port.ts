import { CreateLikeDto } from '../../presenter/dto/like-create.dto';
import { LikeResponseDto } from '../../presenter/dto/like.dto';

export abstract class LikeApplicationService {
  abstract likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto>;
}
