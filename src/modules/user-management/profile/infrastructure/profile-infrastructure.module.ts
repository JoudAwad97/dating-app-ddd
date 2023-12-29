import { Module } from '@nestjs/common';
import { ProfileOrmModule } from './persistence/orm/orm.module';

@Module({
  imports: [ProfileOrmModule],
  exports: [ProfileOrmModule],
})
export class ProfileInfrastructure {}
