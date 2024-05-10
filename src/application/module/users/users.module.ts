import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entity/User.entity';
import { Role } from '../../../domain/entity/Role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UsersResolver, UsersService],
})
export class UsersModule {}
