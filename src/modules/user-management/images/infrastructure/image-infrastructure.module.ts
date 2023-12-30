import { Module } from '@nestjs/common';
import { ImageOrmModule } from './persistence/orm/image-orm.module';

@Module({
  imports: [ImageOrmModule],
  exports: [ImageOrmModule],
})
export class ImageInfrastructureModule {}
