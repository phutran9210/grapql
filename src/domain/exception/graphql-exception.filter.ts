import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ExecutionContext,
    HttpException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = GqlExecutionContext.create(<ExecutionContext>host).getContext();
        if (context.req.url === '/favicon.ico') {
            return; // Bỏ qua lỗi cho favicon
        }

        if (exception instanceof UnprocessableEntityException) {
            const response = exception.getResponse() as any; // Assuming response is of type HttpExceptionResponse
            console.log('UnprocessableEntityException:', response.message);
            const uniqueFirstWords = new Set(); // Using a Set to store unique first words
            const errorMessages = response.message
                .map((msg: string) => {
                    return msg.split(' ')[0];
                })
                .filter((firstWord: string) => {
                    const isNew = !uniqueFirstWords.has(firstWord);
                    if (isNew) {
                        uniqueFirstWords.add(firstWord);
                    }
                    return isNew;
                })
                .map((firstWord: string) => `${firstWord} is not valid.`);

            // Using extensions to pass array of messages
            throw new ApolloError('Validation error', 'UNPROCESSABLE_ENTITY', {
                messages: errorMessages,
            });
        }

        if (exception instanceof UnauthorizedException) {
            // return {
            //     statusCode: 200,
            //     message: 'Unauthorized',
            // };
            throw new ApolloError('Unauthorized', '401');
        }

        if (exception instanceof HttpException) {
            console.log('HttpException:');
            const status = exception.getStatus();
            throw new ApolloError(exception.message, status.toString());
        }

        // Xử lý các ngoại lệ khác
    }
}

