import { Catch, HttpException, ArgumentsHost, UnauthorizedException } from "@nestjs/common";
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    if (exception instanceof UnauthorizedException) {
      throw new ApolloError('Access denied', 'UNAUTHORIZED');
    }

    throw new ApolloError(exception.message, exception.getStatus().toString());
  }
}
