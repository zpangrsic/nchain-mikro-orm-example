import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const mikroOrmConfig: Options = {
  dbName: config.getOrThrow('DATABASE_DB'),
  user: config.getOrThrow('DATABASE_USER'),
  password: config.getOrThrow('DATABASE_PASSWORD'),
  host: config.getOrThrow('DATABASE_HOST'),
  port: config.getOrThrow('DATABASE_PORT'),
  type: config.get('DATABASE_TYPE') || 'postgresql',
  debug: config.get('DATABASE_DEBUG') || false,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
};

export default mikroOrmConfig;
