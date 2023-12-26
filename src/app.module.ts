import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './configs/files/database';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './nest/modules/auth/auth.controller';
import { ProductModule } from './modules/product/product.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { BlogModule } from './modules/blog/blog.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(database),
    AuthModule,
    ProductModule,
    TestimonialModule,
    BlogModule,
    // MulterModule.register({
    //   dest:'./uploads'
    // })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
