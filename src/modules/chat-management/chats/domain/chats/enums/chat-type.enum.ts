import { registerEnumType } from '@nestjs/graphql';

export enum ChatTypes {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}

registerEnumType(ChatTypes, {
  name: 'ChatTypes',
  description: 'Chat types',
});
