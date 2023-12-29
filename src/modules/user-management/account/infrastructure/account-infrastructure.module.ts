import { Module } from '@nestjs/common';
import { AccountOrmModule } from './persistence/orm/orm.module';

@Module({
  imports: [AccountOrmModule],
  exports: [AccountOrmModule],
})
export class AccountInfrastructureModule {}
