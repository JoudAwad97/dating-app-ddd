import { Module } from '@nestjs/common';
import { DislikeOrmModule } from './persistence/orm/dislike-orm.module';

@Module({
  exports: [DislikeOrmModule],
  imports: [DislikeOrmModule],
})
export class DislikeInfrastructureModule {}
