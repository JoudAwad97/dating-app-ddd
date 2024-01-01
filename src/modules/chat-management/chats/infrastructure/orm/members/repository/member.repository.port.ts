import { RepositoryPort } from '@src/libs/ports/repository.port';
import { MembersEntity } from '@src/modules/chat-management/chats/domain/members/members.entity';

export abstract class MembersRepository extends RepositoryPort<MembersEntity> {}
