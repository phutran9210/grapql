import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const configDB = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lamgico123',
    database: 'graphql_tutorial_test',
    entities: ['dist/**/**/*.entity{.ts,.js}'],
    synchronize: true,
    // logging: true
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },

    migrationsTableName: 'migration',
    migrations:
        process.env.NODE_ENV === 'production' ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
    migrationsRun: true,
} as DataSourceOptions;

export default registerAs('typeorm', () => configDB);
export const connectionSource = new DataSource(configDB as DataSourceOptions);
