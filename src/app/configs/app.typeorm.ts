import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Joi from 'joi';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables BEFORE validation
dotenv.config();

// config interface
interface DbConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
}

// Определяем Joi-схему для валидации переменных окружения
const dbSchema = Joi.object<DbConfig>({
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
});

// validation .env
const result: Joi.ValidationResult<DbConfig> = dbSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (result.error) {
  throw new Error(
    `❌ DB environment validation error:\n${result.error.message}`,
  );
}

const envVars = result.value;

// Create an object with already validated values
const dbConfig: DbConfig = {
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  DB_NAME: envVars.DB_NAME,
  DB_USER: envVars.DB_USER,
  DB_PASS: envVars.DB_PASS,
};

// MAin TypeORM configuration
const baseConfig = {
  type: 'mariadb' as const,
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  database: dbConfig.DB_NAME,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASS,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '/../..', '**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
};

export const typeormModuleConfig: TypeOrmModuleOptions = {
  ...baseConfig,
  autoLoadEntities: true,
};

// Для CLI
export const dataSourceConfig: DataSourceOptions = {
  ...baseConfig,
};

// Async configuration for import into AppModule
export const typeormAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory(): TypeOrmModuleOptions {
    return typeormModuleConfig;
  },
};

// Exporting DataSource for CLI or Migrations
export default new DataSource(dataSourceConfig);
