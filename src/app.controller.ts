import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './domain/guard/JwtAuthGuard.guard';

@Controller()
export class AppController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getRootRoute() {
        return {
            statusCode: 200,
            message: 'Welcome to the API!',
        };
    }

    @Get('*')
    @UseGuards(JwtAuthGuard)
    handleAllOtherRoutes() {
        return {
            statusCode: 404,
            message: 'Page not found',
        };
    }
}
