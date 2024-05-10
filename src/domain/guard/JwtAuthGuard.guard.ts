import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../application/module/users/users.service'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private userService: UsersService,
              private configService: ConfigService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const jwt = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET')
      });

      const user = await this.userService.getUserById(+jwt.sub);
      if (!user) {
        throw new UnauthorizedException('User not found!!!');
      }
      const roles = user.roles.map(role => role.name);

      request.user = user;
      request.roles = roles;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token.');
      }
      console.log('err', err);
      throw err;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
