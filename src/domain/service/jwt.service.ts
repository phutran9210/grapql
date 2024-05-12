// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule], // Import ConfigModule if it's not globally imported
            inject: [ConfigService], // Inject ConfigService to use it for configuration
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET', 'defaultSecret'), // Get JWT secret from .env
                signOptions: { expiresIn: '1d' }, // Example: tokens expire in 1 day
            }),
            global: true, // This will make JwtModule globally available
        }),
    ],
    exports: [JwtModule] // Export JwtModule to be available in other parts of the application
})
export class JwtService {}
