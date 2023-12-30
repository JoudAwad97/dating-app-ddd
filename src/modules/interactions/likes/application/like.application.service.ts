import { Injectable } from '@nestjs/common';
import { LikeApplicationService } from './ports/like.application.service.port';
import { LikeResponseDto } from '../presenter/dto/like.dto';
import { CreateLikeDto } from '../presenter/dto/like-create.dto';

@Injectable()
export class LikeApplicationServiceImpl implements LikeApplicationService {
  likeAnotherProfile(input: CreateLikeDto): Promise<LikeResponseDto> {
    throw new Error('Method not implemented.');
  }
}
