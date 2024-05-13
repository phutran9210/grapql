// src/graphql.config.ts
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

const gqlFilesPath = join(process.cwd(), 'src/graphql/**/*.{gql,graphql}');
const typesArray = loadFilesSync(gqlFilesPath);
const typeDefs = print(mergeTypeDefs(typesArray));

// const outputFilePath = join(process.cwd(), 'src/graphql/schema.gql'); // Đường dẫn và tên file output
// if (existsSync(outputFilePath)) {
//     console.log('Removing old schema file');
//     unlinkSync(outputFilePath);
// }
// writeFileSync(outputFilePath, typeDefs);

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
