import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class GqlApolloErrorExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof ApolloError) {
      return exception;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500;

    return new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR', {
      status: status,
    });
  }
}