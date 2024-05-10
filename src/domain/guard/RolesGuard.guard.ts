import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../application/module/users/users.service';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) : Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const user = request.user;
    const userRoles = request.roles
    console.log('userRoles', userRoles);
    console.log('roles', roles);
    if (!userRoles) {
      return false;
    }

    const hasRole = () => roles.every((role) => userRoles.includes(role));
    return user && hasRole();
  }
}
