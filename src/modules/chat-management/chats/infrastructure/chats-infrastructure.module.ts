import { Module } from '@nestjs/common';
import { ChatsOrmModule } from './orm/chats/chats-orm.module';
import { ChatsMemberOrmModule } from './orm/members/chats-member-orm.module';

@Module({
  exports: [ChatsOrmModule, ChatsMemberOrmModule],
  imports: [ChatsOrmModule, ChatsMemberOrmModule],
})
export class ChatsInfrastructureModule {}
