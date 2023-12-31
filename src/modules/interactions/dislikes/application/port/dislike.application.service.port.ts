import { CreateDislikeDto } from '../../presenter/dto/create-dislike.dto';
import { DislikeResponseDto } from '../../presenter/dto/dislike.dto';

export abstract class DislikeApplicationService {
  abstract dislikeProfile(input: CreateDislikeDto): Promise<DislikeResponseDto>;
}
