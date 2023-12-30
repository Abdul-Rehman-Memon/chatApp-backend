import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { database } from './core/configs';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { ConnectionsModule } from './modules/connections/connections.module';
import { SharedModule } from './shared/sharedmodule/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(database),
    AuthModule,
    HealthcheckModule,
    ConnectionsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
