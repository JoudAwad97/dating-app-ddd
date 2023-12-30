import { Module } from '@nestjs/common';
import { LikeOrmModule } from './persistence/orm/like-orm.module';

@Module({
  imports: [LikeOrmModule],
  exports: [LikeOrmModule],
})
export class LikeInfrastructureModule {}
