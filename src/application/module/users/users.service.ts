import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '../../../domain/entity/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-express';
import { Role } from '../../../domain/entity/Role.entity';
import { uniqBy } from 'lodash';

@Injectable()
export class UsersService {
    defaultRoleId = 3;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async create(createUserInput: CreateUserInput) {
        console.log('createUserInput', createUserInput);
        try {
            const existingUser = await this.usersRepository.findOne({
                where: { username: createUserInput.username },
            });
            if (existingUser) {
                throw new ApolloError('User already exists!', 'USER_ALREADY_EXISTS', {
                    status: 400,
                });
            }
            const defaultRole = await this.roleRepository.findOne({ where: { id: this.defaultRoleId } });
            const newUser = this.usersRepository.create({
                ...createUserInput,
                roles: [defaultRole],
            });
            return await this.usersRepository.save(newUser);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    findAll() {
        return `This action returns all users`;
    }

    async getUserById(id: number) {
        try {
            const user = await this.usersRepository.findOne({ where: { id }, relations: ['roles'] });
            if (!user) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateUserInput: UpdateUserInput) {
        try {
            const existingUser = await this.usersRepository.findOne({ where: { id } });
            if (!existingUser) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }
            Object.assign(existingUser, updateUserInput);
            return await this.usersRepository.save(existingUser);
        } catch (error) {
            throw error;
        }
    }

    async setRoles(roleIds: number[], userId: number) {
        try {
            const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['roles'] });
            if (!user) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }

            const roles = await this.roleRepository.findBy({ id: In(roleIds) });

            user.roles = uniqBy([...roles, ...user.roles], 'id');

            const savedUser = await this.usersRepository.save(user);
            return savedUser.roles;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeRoles(roleIds: number[], userId: number) {
        try {
            const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['roles'] });
            if (!user) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }

            user.roles = user.roles.filter(
                (role) => !roleIds.includes(role.id) || role.id === this.defaultRoleId,
            );
            const savedUser = await this.usersRepository.save(user);
            return savedUser.roles;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }

            return await this.usersRepository.softRemove(user);
        } catch (error) {
            throw error;
        }
    }

    async getUserPermissions(userId: number): Promise<string[]> {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
                relations: ['roles'],
            });
            if (!user) {
                throw new ApolloError('User not found!', 'USER_NOT_FOUND', {
                    status: 404,
                });
            }
            return user.roles.map((role) => role.name);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
