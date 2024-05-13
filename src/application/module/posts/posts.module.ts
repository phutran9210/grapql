import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entity/User.entity';
import { Role } from '../../../domain/entity/Role.entity';
import { Post } from '../../../domain/entity/Post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Post])],
    providers: [PostsResolver, PostsService],
})
export class PostsModule {}
