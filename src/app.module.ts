import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from './infrastructure/config/graphql.config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './application/module/users/users.module';
import { GqlHttpExceptionFilter } from './domain/exception/graphql-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './application/module/posts/posts.module';
import { RolesModule } from './application/module/roles/roles.module';
import { JwtService } from './domain/service/jwt.service';
import { AppController } from './app.controller';
import { UsersService } from './application/module/users/users.service';

@Module({
    imports: [
        GraphQLModule.forRoot(graphqlConfig),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
            ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
        // JwtModule.registerAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     global: true,
        //     useFactory: (config: ConfigService) => ({
        //         secret: config.get('JWT_SECRET', 'defaultSecret'),
        //         signOptions: { expiresIn: '1d' },
        //     }),
        // }),
        JwtService,
        DatabaseModule,
        UsersModule,
        RolesModule,
        PostsModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GqlHttpExceptionFilter,
        },
    ],
    controllers: [AppController],
})
export class AppModule {}
