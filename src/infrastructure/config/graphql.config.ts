// src/graphql.config.ts
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';

const gqlFilesPath = join(process.cwd(), 'src/graphql/**/*.gql');
const typesArray = loadFilesSync(gqlFilesPath);
const typeDefs = print(mergeTypeDefs(typesArray));

export const graphqlConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    playground: false,
    typeDefs,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req }) => ({ req }),
    formatError: (error) => {
        delete error.extensions.stacktrace;
        return error;
    },
    // fieldResolverEnhancers: ['guards'],
    // installSubscriptionHandlers: true,
    // subscriptions: {
    //     'graphql-ws': {
    //         path: '/graphql',
    //     },
    // },
};