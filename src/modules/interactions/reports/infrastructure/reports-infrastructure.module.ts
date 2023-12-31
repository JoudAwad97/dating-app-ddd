import { Module } from '@nestjs/common';
import { ReportsOrmModule } from './persistence/orm/reports-orm.module';

@Module({
  imports: [ReportsOrmModule],
  exports: [ReportsOrmModule],
})
export class ReportsInfrastructureModule {}
