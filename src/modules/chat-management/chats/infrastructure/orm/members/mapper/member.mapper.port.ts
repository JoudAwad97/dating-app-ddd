import { Mapper } from '@src/libs/ddd';
import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';
import { MemberDatabaseModel } from '../schema/members.schema';

export abstract class MemberMapper extends Mapper<
  MembersEntity,
  MemberDatabaseModel,
  any
> {}
