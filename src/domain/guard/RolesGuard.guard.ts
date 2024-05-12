import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const user = request.user;
        const userRoles = request.roles;

        if (!userRoles) {
            return false;
        }

        const hasRole = () => roles.every((role) => userRoles.includes(role));
        if (user && hasRole()) {
            return true;
        } else {
            throw new UnauthorizedException('Access denied');
        }
    }
}
