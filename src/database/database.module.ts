import { Module, OnModuleInit, OnModuleDestroy, Global, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { configDB } from '../infrastructure/config/typeorm.config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => configDB,
        }),
    ],
    providers: [
        {
            provide: 'DATA_SOURCE',
            useFactory: (dataSource: DataSource) => dataSource,
            inject: [DataSource],
        },
    ],
    exports: ['DATA_SOURCE'],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

    async onModuleInit() {
        if (!this.dataSource.isInitialized) {
            try {
                await this.dataSource.initialize();
                console.log('Database connected.');
            } catch (error) {
                console.error('Error during Data Source initialization:', error);
                throw error;
            }
        }
        console.log('Database connection initialized.');
    }

    async onModuleDestroy() {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
            console.log('Database connection closed.');
        }
    }
}
