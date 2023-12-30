import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const database: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: () => {
    let config: TypeOrmModuleOptions;
    config = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chatapp',
      entities: [__dirname + './../../models/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };

    return config;
  },
};
