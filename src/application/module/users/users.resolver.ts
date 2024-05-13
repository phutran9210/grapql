import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../../../domain/entity/User.entity';
import { UserInputs, UpdateUserInput } from '../../dto';
import { JwtAuthGuard } from '../../../domain/guard/JwtAuthGuard.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../../domain/guard/decorator/token-name.decorator';
import { EDIT_ROLES } from '../../../infrastructure/constants/RoleGroup.constants';
import { RolesGuard } from '../../../domain/guard/RolesGuard.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(...EDIT_ROLES)
    async createUser(@Args('createUserInput') createUserInput: UserInputs) {
        return await this.usersService.create(createUserInput);
    }

    @Query(() => [User])
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User)
    async findOne(@Args('id', { type: () => Int }) id: number) {
        return await this.usersService.getUserById(id);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(...EDIT_ROLES)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Args('id', { type: () => Int }) id: number,
    ) {
        return await this.usersService.update(id, updateUserInput);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(...EDIT_ROLES)
    setRolesToUser(
        @Args('roleIds', { type: () => [Int] }) roleIds: number[],
        @Args('userId', { type: () => Int }) userId: number,
    ) {
        return this.usersService.setRoles(roleIds, userId);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(...EDIT_ROLES)
    removeRolesFromUser(
        @Args('roleIds', { type: () => [Int] }) roleIds: number[],
        @Args('userId', { type: () => Int }) userId: number,
    ) {
        return this.usersService.removeRoles(roleIds, userId);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(...EDIT_ROLES)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.remove(id);
    }
}
