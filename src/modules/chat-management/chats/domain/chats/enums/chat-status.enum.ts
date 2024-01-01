import { registerEnumType } from '@nestjs/graphql';

export enum ChatStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(ChatStatus, {
  name: 'ChatStatus',
  description: 'Chat status',
});
