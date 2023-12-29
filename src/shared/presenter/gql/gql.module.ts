import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  isIntrospectionAllowed,
  isPlaygroundAllowed,
} from './configuration.gql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: isPlaygroundAllowed(),
      autoSchemaFile: './schema.graphql',
      sortSchema: true,
      cache: 'bounded',
      introspection: isIntrospectionAllowed(),
    }),
  ],
})
export class GqlModule {}
