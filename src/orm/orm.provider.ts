import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';

export const getOrmConfigProvider = (
  config: ConfigService,
): MikroOrmModuleOptions => {
  return {
    dbName: config.getOrThrow('DATABASE_DB'),
    user: config.getOrThrow('DATABASE_USER'),
    password: config.getOrThrow('DATABASE_PASSWORD'),
    host: config.getOrThrow('DATABASE_HOST'),
    port: config.getOrThrow('DATABASE_PORT'),
    type: config.get('DATABASE_TYPE') || 'postgresql',
    autoLoadEntities: true,
    debug: config.get('DATABASE_DEBUG') || false,
  };
};
